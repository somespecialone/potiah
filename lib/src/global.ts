import type { TScrollTo } from './types'
import type Potiah from './scroll'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $scroll: Potiah
    $scrollTo: TScrollTo
  }
}
