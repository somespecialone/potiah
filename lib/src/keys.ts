import type { InjectionKey } from 'vue'

import type { TScrollTo } from './types'
import type Potiah from './scroll'

export const scrollInstKey = Symbol() as InjectionKey<Potiah>
export const scrollToKey = Symbol() as InjectionKey<TScrollTo>
