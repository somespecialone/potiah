import type { Potiah } from './potiah'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $potiah: Potiah
    $scrollTo: Potiah['scrollTo']
  }
}
