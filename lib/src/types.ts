import type { Ref } from 'vue'
import type {
  scrollCallWay,
  scrollCallFrom,
  ILenisScrollToOptions,
  lenisTargetScrollTo,
  ILocomotiveScrollOptions,
  ILenisOptions
} from 'locomotive-scroll/dist/types/types'
import type Core from 'locomotive-scroll/dist/types/core/Core'
import type Lenis from '@studio-freight/lenis'

import type Potiah from './scroll'

export type TCreateFuncOptions = Omit<ILocomotiveScrollOptions, 'lenisOptions' | 'scrollCallback'>

export type TScrollTo = (target: lenisTargetScrollTo, options?: ILenisScrollToOptions) => void

export interface IScroll {
  scrollTo: TScrollTo

  isReady: Ref<boolean>
  direction: Ref<number>
  isScrolling: Ref<boolean>
  scroll: Potiah
}

export type TLenisOptions = Omit<ILenisOptions, 'wrapper' | 'content' | 'orientation'>

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

export interface InitDoneCallbackData {
  core: Core
  lenis: Lenis
}
