import { inject, computed } from 'vue'

import type { IComposeReturn } from './types'
import { instKey } from './keys'

export function usePotiah(): IComposeReturn {
  const potiah = inject(instKey)!

  return {
    scrollTo: potiah.scrollTo,
    direction: computed(() => potiah.direction),
    isScrolling: computed(() => potiah.isScrolling),
    potiah
  }
}
