<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, inject } from 'vue'

import type Lenis from '@studio-freight/lenis'

import { assignWithOmit } from '../utils'
import { TLenisOptions } from '../types'
import { scrollInstKey } from '../keys'
import { SCROLL_DIRECTION_VAR, WRAPPER_PROGRESS_VAR } from '../constants'

export interface IViewProps {
  root?: boolean
  wrapperIs?: keyof HTMLElementTagNameMap | string
  contentIs?: keyof HTMLElementTagNameMap | string
  cssProgress?: boolean
  cssDirection?: boolean
}

// @ts-ignore
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

onMounted(() => {
  scroll.isReady.value && scroll.destroy() // clear previous mounted data

  assignWithOmit(scroll.lenisOptionsGetter, props, ['wrapperIs', 'contentIs'])

  scroll.init(({ lenis }) => {
    const rootEl = lenis.rootElement as HTMLElement
    props.cssProgress && rootEl.style.setProperty(WRAPPER_PROGRESS_VAR, '0')
    props.cssDirection && rootEl.style.setProperty(SCROLL_DIRECTION_VAR, '1')

    lenis.on('scroll', () => {
      cssProgressRaw && rootEl.style.setProperty(WRAPPER_PROGRESS_VAR, lenis.progress.toString())
      emit('lenis-scroll', lenis)
    })
  })
})

watch(props, (n) => {
  const newProps = assignWithOmit({}, n, ['wrapperIs', 'contentIs'])
  scroll.isReady.value && Object.assign(scroll.lenis!.options, newProps)
  Object.assign(scroll.lenisOptionsGetter, newProps)
})

onBeforeUnmount(() => scroll.destroy())
</script>

<template>
  <slot v-if="root" />
  <component v-else :is="wrapperIs as string" :ref="(el) => (scroll.lenisOptionsGetter.wrapper = el)">
    <component :is="contentIs as string" :ref="(el) => (scroll.lenisOptionsGetter.content = el)">
      <slot />
    </component>
  </component>
</template>

<style lang="css">
@import '../../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
</style>
