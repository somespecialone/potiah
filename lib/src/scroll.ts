import { ref } from 'vue'
import type { App } from 'vue'

import type Lenis from '@studio-freight/lenis'
import LocomotiveScrollOrigin from 'locomotive-scroll'

import type { TScrollTo } from './types'
import { directionIKey, isReadyKey, scrollInstKey, scrollToKey } from './keys'
import ScrollView from './components/ScrollView.vue'
import ScrollComponent from './components/ScrollComponent.vue'

// @ts-expect-error
export default class LocomotiveScroll extends LocomotiveScrollOrigin {
  public get lenis(): Lenis | null {
    // @ts-expect-error
    return this.lenisInstance || null
  }

  /**
   * @internal
   */
  install(app: App) {
    const isReady = ref(false)
    const direction = ref(1)
    const scrollTo: TScrollTo = (t, o) => isReady.value && this.lenis?.scrollTo(t, o)

    app.component('ScrollView', ScrollView)
    app.component('ScrollComponent', ScrollComponent)
    app.config.globalProperties.$scroll = this
    app.config.globalProperties.$scrollTo = scrollTo

    app.provide(scrollInstKey, this)
    app.provide(isReadyKey, isReady)
    app.provide(directionIKey, direction)
    app.provide(scrollToKey, scrollTo)
  }

  // @ts-expect-error
  private _init() {}

  /**
   * @internal
   */
  init() {
    // @ts-expect-error
    super._init()
  }
}
