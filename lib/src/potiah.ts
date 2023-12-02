import { markRaw, reactive, nextTick } from 'vue'
import type { App } from 'vue'

import type Lenis from '@studio-freight/lenis'
import type ScrollElement from 'locomotive-scroll/dist/types/core/ScrollElement'
import type {
  lenisTargetScrollTo,
  ILenisScrollToOptions,
  ILenisOptions,
  ILocomotiveScrollOptions,
  ILenisScrollValues
} from 'locomotive-scroll/dist/types/types'
import type Core from 'locomotive-scroll/dist/types/core/Core'

import type LocomotiveScroll from 'locomotive-scroll'

import { instKey } from './keys'
import { infiniteGenerator } from './utils'
import { InitDoneCallbackData, ILocomotiveProps } from './types'

// @ts-expect-error
export interface ICore extends Core {
  scrollElements: ScrollElement[]
}

/**
 * Extended interface of {@link LocomotiveScroll} to expose private properties.
 */
// @ts-expect-error
export interface ILocomotiveScroll extends LocomotiveScroll {
  /**
   * @see https://github.com/studio-freight/lenis#instance-settings
   */
  lenisOptions: ILenisOptions

  /**
   * {@link Lenis} instance.
   *
   * @see https://github.com/studio-freight/lenis#instance-props
   * @see https://github.com/studio-freight/lenis#instance-methods
   */
  lenisInstance?: Lenis

  /**
   * {@link Core} instance.
   */
  coreInstance?: ICore
}

/**
 * Potiah instance.
 */
export interface Potiah {
  /**
   * Last (current if {@link isScrolling} true) scroll direction.
   * '1' - to bottom/right, '-1' - to top/left.
   *
   * @default 1
   */
  direction: 1 | -1

  /**
   * Whether the scroll is being animated.
   *
   * @default false
   */
  isScrolling: boolean

  /**
   * Instance of {@link LocomotiveScroll} if created.
   */
  scroll?: ILocomotiveScroll

  /**
   * Smooth scroll to target of the {@link Lenis} shorthand.
   *
   * @see https://github.com/studio-freight/lenis#instance-methods
   *
   * @param target - target value to scroll
   * @param options - options object
   */
  scrollTo(target: lenisTargetScrollTo, options?: ILenisScrollToOptions): void

  /**
   * Used to create {@link LocomotiveScroll} instance.
   * Should be called in browser environment.
   */
  _init(
    options?: Omit<ILocomotiveScrollOptions, 'scrollCallback'>,
    callback?: (data: InitDoneCallbackData) => any
  ): Promise<InitDoneCallbackData>

  /**
   * Used to destroy {@link LocomotiveScroll} instance.
   */
  _destroy(): Promise<void>

  /**
   * Used to generate unique ID for ScrollComponent.
   */
  _generateId(): number

  /**
   * Used by Vue {@link App} internally.
   */
  install(app: App): void
}

/**
 * Creates a Potiah instance.
 */
export function createPotiah(defOptions: ILocomotiveProps = {}): Potiah {
  const generator = infiniteGenerator()
  const potiah: Potiah = reactive({
    direction: 1,
    isScrolling: false,
    scrollTo(target, options) {
      potiah.scroll?.lenisInstance?.scrollTo(target, options)
    },
    _generateId() {
      return generator.next().value as number
    },
    install(app) {
      app.config.globalProperties.potiah = potiah
      app.config.globalProperties.$scrollTo = potiah.scrollTo

      app.provide(instKey, potiah)
    },
    async _init(opt, cbk = () => {}) {
      // raw vars for max performance
      let direction = potiah.direction
      let isScrolling = potiah.isScrolling

      const scrollCallback = (v: ILenisScrollValues) => {
        if (direction != v.direction) {
          potiah.direction = direction = v.direction as 1 | -1
        }
      }

      const { default: LocomotiveScroll } = await import('locomotive-scroll')

      // @ts-expect-error
      const loco = markRaw<ILocomotiveScroll>(new LocomotiveScroll({ ...defOptions, ...opt, scrollCallback }))

      // wait when Core, Lenis instances are created
      await new Promise((resolve) => {
        requestAnimationFrame(() => resolve(null))
      })

      // then patch Lenis property
      // https://github.com/studio-freight/lenis/blob/0370ab155771e2e6771f2039c7d15514662af975/src/index.js#L455
      const descr = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(loco.lenisInstance!), 'isScrolling')!
      Object.defineProperty(loco.lenisInstance!, 'isScrolling', {
        get() {
          return descr.get!.call(this)
        },
        set(value: boolean) {
          descr.set!.call(this, value)
          if (isScrolling != value) {
            potiah.isScrolling = isScrolling = value
          }
        }
      })

      potiah.scroll = loco

      cbk({ lenis: loco.lenisInstance!, core: loco.coreInstance! })
      return { lenis: loco.lenisInstance!, core: loco.coreInstance! }
    },
    async _destroy() {
      potiah.scroll?.destroy()
      potiah.scroll = undefined
      await nextTick() // wait until all instances are destroyed
    }
  })

  return potiah
}
