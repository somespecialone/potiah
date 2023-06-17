import type { Ref } from 'vue'
import type {
  scrollCallWay,
  scrollCallFrom,
  ILenisScrollToOptions,
  lenisTargetScrollTo,
  ILocomotiveScrollOptions
} from 'locomotive-scroll/dist/types/types'

import type LocomotiveScroll from './scroll'

export type TCreateFuncOptions = Omit<ILocomotiveScrollOptions, 'lenisOptions' | 'scrollCallback'>

export type TScrollTo = (target: lenisTargetScrollTo, options?: ILenisScrollToOptions) => void

export interface IVuecomotiveScroll {
  scrollTo: TScrollTo

  isReady: Ref<boolean>
  direction: Ref<number>
  scroll: LocomotiveScroll
}

export interface IScrollElementProps {
  position?: 'start' | 'middle' | 'end'
  offset?: string
  inViewClass?: string
  repeat?: boolean
  speed?: number
  cssProgress?: boolean
  eventProgress?: boolean
  ignoreFold?: boolean
  touchSpeed?: boolean
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
