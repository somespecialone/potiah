import { inject } from 'vue'

import type { IVuecomotiveScroll } from './types'
import { scrollInstKey, scrollToKey } from './keys'

export default function useVuecomotiveScroll(): IVuecomotiveScroll {
  const scroll = inject(scrollInstKey)!
  const scrollTo = inject(scrollToKey)!

  return {
    scrollTo,
    isReady: scroll.isReady,
    direction: scroll.direction,
    scroll,
    isScrolling: scroll.isScrolling
  }
}
