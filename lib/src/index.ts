import type { TCreateFuncOptions } from './types'

export * from './global'

import Potiah from './scroll'
import useScroll from './composable'

export * from './utils'
export * from './constants'

import ScrollView from './components/ScrollView.vue'
import ScrollComponent from './components/ScrollComponent.vue'

export default function createPotiah(options?: TCreateFuncOptions): Potiah {
  return new Potiah(options)
}

export { Potiah, useScroll, ScrollView, ScrollComponent }

export type { IScroll, IIntersectEventPayload, IProgressEventPayload, IScrollElementProps, TPosition } from './types'
