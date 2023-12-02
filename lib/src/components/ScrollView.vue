<script setup lang="ts">
import { ref, onBeforeUnmount, watch, inject, onMounted } from 'vue'

import type Lenis from '@studio-freight/lenis'

import { assignWithOmit } from '../utils'
import { TLenisOptions } from '../types'
import { scrollInstKey } from '../keys'
import { SCROLL_DIRECTION_VAR, WRAPPER_PROGRESS_VAR } from '../constants'

export interface IViewProps {
  root?: boolean
  wrapperIs?: keyof HTMLElementTagNameMap
  contentIs?: keyof HTMLElementTagNameMap
  cssProgress?: boolean
  cssDirection?: boolean
  horizontal?: boolean
}

const props = withDefaults(defineProps<IViewProps & TLenisOptions>(), {
  wrapperIs: 'div',
  contentIs: 'div',
  smoothWheel: true,
  normalizeWheel: true
})

const emit = defineEmits<{ (e: 'lenis-scroll', lenis: Lenis): void }>()

const scroll = inject(scrollInstKey)!

// reading from raw variable faster than from proxy object
// eslint-disable-next-line vue/no-setup-props-destructure
let cssProgressRaw = props.cssProgress
watch(
  () => props.cssProgress,
  (p) => (cssProgressRaw = p)
)

watch(
  scroll.direction,
  // @ts-expect-error
  (d) => props.cssDirection && scroll.lenis!.rootElement.style.setProperty(SCROLL_DIRECTION_VAR, d.toString())
)

// TODO this cause "[Vue warn]: Invalid watch source" with Nuxt on server side
watch(props, (n) => {
  const newProps = assignWithOmit({}, n, ['wrapperIs', 'contentIs', 'horizontal'])
  scroll.isReady.value && Object.assign(scroll.lenis!.options, newProps)
  Object.assign(scroll.lenisOptionsGetter, newProps)
})

const wrapper = ref<HTMLElement>()
const content = ref<HTMLElement>()

onMounted(async () => {
  // ensure that previous instance destroyed
  if (scroll.isReady.value) {
    await new Promise((resolve) => {
      const stop = watch(scroll.isReady, (r) => {
        if (!r) {
          stop()
          resolve(null)
        }
      })
    })
  }

  assignWithOmit(scroll.lenisOptionsGetter, props, ['wrapperIs', 'contentIs', 'horizontal'])
  if (props.horizontal) {
    scroll.lenisOptionsGetter.orientation = 'horizontal'
  }

  scroll.lenisOptionsGetter.wrapper = wrapper.value
  scroll.lenisOptionsGetter.content = content.value

  await scroll.init(({ lenis }) => {
    const rootEl = lenis.rootElement as HTMLElement

    lenis.on('scroll', () => {
      cssProgressRaw && rootEl.style.setProperty(WRAPPER_PROGRESS_VAR, lenis.progress.toString())
      emit('lenis-scroll', lenis)
    })
  })
})

onBeforeUnmount(() => scroll.destroy())
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

<style lang="css">
@import '../../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
</style>
