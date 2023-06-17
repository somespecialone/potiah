import type { TScrollTo } from './types'
import type LocomotiveScroll from './scroll'

import ScrollView from './components/ScrollView.vue'
import ScrollComponent from './components/ScrollComponent.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ScrollView: typeof ScrollView
    ScrollComponent: typeof ScrollComponent
  }

  export interface ComponentCustomProperties {
    $scroll: LocomotiveScroll
    $scrollTo: TScrollTo
  }
}
