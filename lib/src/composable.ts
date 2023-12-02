import { inject } from 'vue'

import type { IScroll } from './types'
import { scrollInstKey, scrollToKey } from './keys'

export default function useScroll(): IScroll {
  const scroll = inject(scrollInstKey)!
  const scrollTo = inject(scrollToKey)!

  const { isReady, direction, isScrolling } = scroll

  return {
    scrollTo,
    isReady,
    direction,
    scroll,
    isScrolling
  }
}
