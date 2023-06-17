import type { InjectionKey, Ref } from 'vue'

import type { TScrollTo } from './types'
import type LocomotiveScroll from './scroll'

export const scrollInstKey = Symbol() as InjectionKey<LocomotiveScroll>
export const directionIKey = Symbol() as InjectionKey<Ref<number>>
export const isReadyKey = Symbol() as InjectionKey<Ref<boolean>>
export const scrollToKey = Symbol() as InjectionKey<TScrollTo>
