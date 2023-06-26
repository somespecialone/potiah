import type { InjectionKey } from 'vue'

import type { TScrollTo } from './types'
import type VuecomotiveScroll from './scroll'

export const scrollInstKey = Symbol() as InjectionKey<VuecomotiveScroll>
export const scrollToKey = Symbol() as InjectionKey<TScrollTo>
