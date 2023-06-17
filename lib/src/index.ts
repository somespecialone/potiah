import type { TCreateFuncOptions } from './types'

export * from './augmenting'

import LocomotiveScroll from './scroll'
import useVuecomotiveScroll from './hook'

import ScrollView from './components/ScrollView.vue'
import ScrollComponent from './components/ScrollComponent.vue'

export default function createVuecomotiveScroll(options?: TCreateFuncOptions): LocomotiveScroll {
  return new LocomotiveScroll(options)
}

export { LocomotiveScroll, useVuecomotiveScroll, ScrollView, ScrollComponent }
export type { IVuecomotiveScroll, IIntersectEventPayload, IProgressEventPayload, IScrollElementProps } from './types'
