import type { InjectionKey } from 'vue'

import type { TScrollTo } from './types'
import type LocomotiveScroll from './scroll'

export const scrollInstKey = Symbol() as InjectionKey<LocomotiveScroll>
export const scrollToKey = Symbol() as InjectionKey<TScrollTo>
