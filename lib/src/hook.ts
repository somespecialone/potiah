import { inject } from 'vue'

import type { IVuecomotiveScroll } from './types'
import { directionIKey, scrollInstKey, isReadyKey, scrollToKey } from './keys'

export default function useVuecomotiveScroll(): IVuecomotiveScroll {
  const scroll = inject(scrollInstKey)!
  const direction = inject(directionIKey)!
  const isReady = inject(isReadyKey)!
  const scrollTo = inject(scrollToKey)!

  return {
    scrollTo,
    isReady,
    direction,
    scroll
  }
}
