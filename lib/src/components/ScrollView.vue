<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref, inject } from 'vue'

import type Lenis from '@studio-freight/lenis'

import { assignWithOmit } from '../utils'
import { TLenisOptions } from '../types'
import { scrollInstKey } from '../keys'

const WRAPPER_PROGRESS_VAR = '--wrapper-progress'
const SCROLL_DIRECTION_VAR = '--scroll-direction'

export interface IViewProps {
  root?: boolean
  wrapperIs?: keyof HTMLElementTagNameMap | string
  contentIs?: keyof HTMLElementTagNameMap | string
  cssProgress?: boolean
  cssDirection?: boolean
}

// @ts-ignore
const props = withDefaults(defineProps<IViewProps & TLenisOptions>(), {
  wrapperIs: 'main',
  contentIs: 'div',
  smoothWheel: true,
  normalizeWheel: true
})

const emit = defineEmits<{ (e: 'lenis-scroll', lenis: Lenis): void }>()

const wrapper = ref<HTMLElement | Window>(window)
const content = ref<HTMLElement>(document.documentElement)

const scroll = inject(scrollInstKey)!

// eslint-disable-next-line vue/no-setup-props-destructure
let cssProgressRaw = props.cssProgress
watch(
  () => props.cssProgress,
  (p) => (cssProgressRaw = p)
)

function scrollCallback(v: Lenis) {
  // @ts-expect-error
  cssProgressRaw && scroll.lenis!.rootElement.style.setProperty(WRAPPER_PROGRESS_VAR, v.progress.toString())
  emit('lenis-scroll', v)
}

watch(
  scroll.direction,
  // @ts-expect-error
  (d) => props.cssDirection && scroll.lenis!.rootElement.style.setProperty(SCROLL_DIRECTION_VAR, d.toString())
)

onMounted(() => {
  // @ts-expect-error
  assignWithOmit(scroll.lenisOptions, props, ['wrapperIs', 'contentIs'])

  // @ts-expect-error
  scroll.lenisOptions.wrapper = wrapper.value
  // @ts-expect-error
  scroll.lenisOptions.content = content.value

  scroll.init(({ lenis }) => {
    const rootEl = lenis.rootElement as HTMLElement
    props.cssProgress && rootEl.style.setProperty(WRAPPER_PROGRESS_VAR, '0')
    props.cssDirection && rootEl.style.setProperty(SCROLL_DIRECTION_VAR, '1')

    lenis.on('scroll', scrollCallback)
  })
})

watch(props, (n) => {
  const newProps = assignWithOmit({}, n, ['wrapperIs', 'contentIs'])
  scroll.isReady.value && Object.assign(scroll.lenis!.options, newProps)
  // @ts-expect-error
  Object.assign(scroll.lenisOptions, newProps)
})

onUnmounted(() => scroll.destroy())

defineExpose({ scroll, wrapper, content })
</script>

<template>
  <slot v-if="root" />
  <component v-else :is="wrapperIs as string" ref="wrapper" class="vuecomotive-scroll-wrapper">
    <component :is="contentIs as string" ref="content" class="vuecomotive-scroll-content">
      <slot />
    </component>
  </component>
</template>

<style lang="css">
@import '../../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
</style>
