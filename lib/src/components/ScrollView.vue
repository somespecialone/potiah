<script setup lang="ts">
import { ref, onBeforeUnmount, watch, inject, onMounted } from 'vue'

import type Lenis from '@studio-freight/lenis'
import type { ILenisOptions } from 'locomotive-scroll/dist/types/types'

import type { ILenisProps, ILocomotiveProps, IViewProps } from '../types'

import { instKey } from '../keys'
import { SCROLL_DIRECTION_VAR, WRAPPER_PROGRESS_VAR } from '../constants'

const props = withDefaults(defineProps<IViewProps & ILenisProps & ILocomotiveProps>(), {
  wrapperIs: 'main',
  contentIs: 'div',
  smoothWheel: true,
  normalizeWheel: true,
  autoStart: true
})

const emit = defineEmits<{ (e: 'lenis-scroll', lenis: Lenis): void }>()

const potiah = inject(instKey)!

// reading from raw variable faster than from proxy object
// eslint-disable-next-line vue/no-setup-props-destructure
let cssProgressRaw = props.cssProgress
watch(
  () => props.cssProgress,
  (p) => (cssProgressRaw = p)
)

watch(
  () => potiah.direction,
  (d) => {
    if (props.cssDirection && potiah.scroll?.lenisInstance) {
      const rootEl = potiah.scroll.lenisInstance.rootElement as HTMLElement
      rootEl.style.setProperty(SCROLL_DIRECTION_VAR, d.toString())
    }
  }
)

function separateProps(p?: IViewProps & ILocomotiveProps & ILenisProps): [IViewProps, ILocomotiveProps, ILenisProps] {
  const { root, wrapperIs, contentIs, cssProgress, cssDirection, horizontal, ...other } = p || props
  const {
    modularInstance,
    triggerRootMargin,
    rafRootMargin,
    autoResize,
    autoStart,
    initCustomTicker,
    destroyCustomTicker,
    ...lenisProps
  } = other

  return [
    { root, wrapperIs, contentIs, cssProgress, cssDirection, horizontal }, // comp props
    { modularInstance, triggerRootMargin, rafRootMargin, autoResize, autoStart, initCustomTicker, destroyCustomTicker }, // loco props
    lenisProps
  ]
}

// watch only known reactive property/ies
watch(
  () => [props.duration],
  ([duration]) => {
    if (potiah.scroll?.lenisInstance) {
      const lenisOptions = { duration }
      Object.assign(potiah.scroll.lenisOptions, lenisOptions)
      Object.assign(potiah.scroll.lenisInstance.options, lenisOptions)
    }
  }
)

const wrapper = ref<HTMLElement>()
const content = ref<HTMLElement>()

onMounted(async () => {
  // ensure that previous instance destroyed
  if (potiah.scroll) {
    await new Promise((resolve) => {
      const stop = watch(
        () => potiah.scroll,
        (r) => {
          if (!r) {
            stop()
            resolve(null)
          }
        }
      )
    })
  }

  const [{ horizontal }, scrollProps, lenisProps] = separateProps()

  const lenisOptions: ILenisOptions = {
    wrapper: wrapper.value,
    content: content.value,
    orientation: horizontal ? 'horizontal' : 'vertical',
    ...lenisProps
  }

  const { lenis } = await potiah._init({ ...scrollProps, lenisOptions })
  const rootEl = lenis.rootElement as HTMLElement
  lenis.on('scroll', () => {
    cssProgressRaw && rootEl.style.setProperty(WRAPPER_PROGRESS_VAR, lenis.progress.toString())
    emit('lenis-scroll', lenis)
  })
})

onBeforeUnmount(() => potiah._destroy())
</script>

<template>
  <slot v-if="root" />
  <component
    v-else
    :is="wrapperIs"
    ref="wrapper"
    :style="{
      [WRAPPER_PROGRESS_VAR]: cssProgress ? '0' : undefined,
      [SCROLL_DIRECTION_VAR]: cssDirection ? '1' : undefined
    }"
  >
    <component :is="contentIs" ref="content">
      <slot />
    </component>
  </component>
</template>
