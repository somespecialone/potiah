import type { ComputedRef } from 'vue'
import type { scrollCallWay, scrollCallFrom } from 'locomotive-scroll/dist/types/types'
import type Lenis from '@studio-freight/lenis'

import type { ICore, Potiah } from './potiah'
import type { ILenisOptions, ILocomotiveScrollOptions } from 'locomotive-scroll/dist/types/types'

export interface IComponentProps {
  /**
   * Specify HTML Element tag to render.
   */
  is?: keyof HTMLElementTagNameMap
}

export interface IViewProps {
  /**
   * Whether {@link Lenis} will enable smooth scroll on {@link Window} or container element.
   */
  root?: boolean

  /**
   * Specify wrapper HTML Element tag.
   */
  wrapperIs?: keyof HTMLElementTagNameMap

  /**
   * Specify content HTML Element tag.
   */
  contentIs?: keyof HTMLElementTagNameMap

  /**
   * Whether progress will be exposed on root element as css custom property `--view-progress`.
   *
   * @default false
   */
  cssProgress?: boolean

  /**
   * Whether scroll direction will be exposed on root element as css custom property `--scroll-direction`.
   *
   * @default false
   */
  cssDirection?: boolean

  /**
   * Direction of the scroll content. Vertical by default.
   *
   * @default false
   */
  horizontal?: boolean
}

export interface ILenisProps
  extends Omit<ILenisOptions, 'wrapper' | 'content' | 'orientation' | 'eventsTarget' | 'autoResize'> {}

export interface ILocomotiveProps extends Omit<ILocomotiveScrollOptions, 'lenisOptions' | 'scrollCallback'> {}

export interface IComposeReturn {
  /**
   * Smooth scroll to target of the {@link Lenis} shorthand.
   *
   * @see https://github.com/studio-freight/lenis#instance-methods
   *
   * @param target - target value to scroll
   * @param options - options object
   */
  scrollTo: Potiah['scrollTo']

  /**
   * Last (current if {@link isScrolling} true) scroll direction.
   * '1' - to bottom/right, '-1' - to top/left.
   *
   * @default 1
   */
  direction: ComputedRef<1 | -1>
  /**
   * Whether the scroll is being animated.
   *
   * @default false
   */
  isScrolling: ComputedRef<boolean>

  /**
   * Instance of the {@link Potiah}.
   */
  potiah: Potiah
}

export type TPosition =
  | 'start'
  | 'middle'
  | 'end'
  | ',start'
  | ',middle'
  | ',end'
  | 'start,start'
  | 'start,middle'
  | 'start,end'
  | 'middle,start'
  | 'middle,middle'
  | 'middle,end'
  | 'end,start'
  | 'end,middle'
  | 'end,end'

export interface IScrollElementProps {
  position?: TPosition
  offset?: string
  inViewClass?: string
  repeat?: boolean
  speed?: number
  cssProgress?: boolean
  ignoreFold?: boolean
  enableTouchSpeed?: boolean
}

interface IEventPayload {
  target: HTMLElement
}

export interface IIntersectEventPayload extends IEventPayload {
  way: scrollCallWay
  from: scrollCallFrom
}

export interface IProgressEventPayload extends IEventPayload {
  progress: number
}

export interface InitDoneCallbackData {
  core: ICore
  lenis: Lenis
}
