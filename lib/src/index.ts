import type { TCreateFuncOptions } from './types'

export * from './global'

import VuecomotiveScroll from './scroll'
import useScroll from './hook'

export { assignWithOmit, boolToDataAttr } from './utils'

import ScrollView from './components/ScrollView.vue'
import ScrollComponent from './components/ScrollComponent.vue'

export default function createVuecomotiveScroll(options?: TCreateFuncOptions): VuecomotiveScroll {
  return new VuecomotiveScroll(options)
}

export { VuecomotiveScroll, useScroll, ScrollView, ScrollComponent }
export type {
  IVuecomotiveScroll,
  IIntersectEventPayload,
  IProgressEventPayload,
  IScrollElementProps,
  TPosition
} from './types'
