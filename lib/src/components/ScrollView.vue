<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref, inject } from 'vue'

import type Lenis from '@studio-freight/lenis'

import { assignWithOmit } from '../utils'
import { TLenisOptions } from '../types'
import { scrollInstKey, directionIKey, isReadyKey } from '../keys'

const WRAPPER_PROGRESS_VAR = '--wrapper-progress'

export interface IViewProps {
  root?: boolean
  wrapperIs?: keyof HTMLElementTagNameMap | string
  contentIs?: keyof HTMLElementTagNameMap | string
  cssProgress?: boolean
}

// @ts-ignore
const props = withDefaults(defineProps<IViewProps & TLenisOptions>(), {
  wrapperIs: 'main',
  contentIs: 'div',
  smoothWheel: true,
  normalizeWheel: true
})

const emit = defineEmits<{ (e: 'lenis-scroll', lenis: Lenis): void }>()

const wrapper = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

const scroll = inject(scrollInstKey)!
const isReady = inject(isReadyKey)!
const direction = inject(directionIKey)!
let cssProgressEl: HTMLElement | null = null

function scrollCallback(v: Lenis) {
  direction.value != v.direction && (direction.value = v.direction)
  props.cssProgress && cssProgressEl?.style.setProperty(WRAPPER_PROGRESS_VAR, v.progress.toString())
  emit('lenis-scroll', v)
}

onMounted(() => {
  // @ts-expect-error
  assignWithOmit(scroll.lenisOptions, props, ['wrapperIs', 'contentIs'])

  if (props.root) props.cssProgress && (cssProgressEl = document.documentElement)
  else {
    props.cssProgress && (cssProgressEl = wrapper.value!)
    // @ts-expect-error
    scroll.lenisOptions.wrapper = wrapper.value
    // @ts-expect-error
    scroll.lenisOptions.content = content.value
  }

  cssProgressEl?.style.setProperty(WRAPPER_PROGRESS_VAR, '0')

  // @ts-expect-error
  scroll.scrollCallback = scrollCallback

  scroll.init()
  requestAnimationFrame(() => (isReady.value = true))
})

watch(props, (n) => {
  const newProps = assignWithOmit({}, n, ['wrapperIs', 'contentIs'])
  isReady.value && Object.assign(scroll.lenis!.options, newProps)
  // @ts-expect-error
  Object.assign(scroll.lenisOptions, newProps)
})

onUnmounted(() => {
  isReady.value = false
  scroll.destroy()
})

defineExpose({ scroll, isReady, direction, wrapper, content })
</script>

<template>
  <component v-if="!root" :is="wrapperIs as string" ref="wrapper" class="vuecomotive-scroll-wrapper">
    <component :is="contentIs as string" ref="content" class="vuecomotive-scroll-content">
      <slot />
    </component>
  </component>
  <slot v-else />
</template>

<style lang="css">
@import '../../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
</style>
