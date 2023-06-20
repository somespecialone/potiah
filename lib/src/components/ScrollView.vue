<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref, inject, computed } from 'vue'

import type Lenis from '@studio-freight/lenis'

import { assignWithOmit } from '../utils'
import { TLenisOptions } from '../types'
import { scrollInstKey, directionIKey, isReadyKey } from '../keys'

const LENIS_PROGRESS_VAR = '--lenis-progress'

export interface IViewProps {
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

const wrapper = ref<HTMLElement>()
const content = ref<HTMLElement>()
const lenisProgressStyle = computed(() => (props.cssProgress ? LENIS_PROGRESS_VAR + ': 0;' : ''))

const scroll = inject(scrollInstKey)!
const isReady = inject(isReadyKey)!
const direction = inject(directionIKey)!

function scrollCallback(v: Lenis) {
  direction.value != v.direction && (direction.value = v.direction)
  props.cssProgress && wrapper.value!.style.setProperty(LENIS_PROGRESS_VAR, v.progress.toString())
  emit('lenis-scroll', v)
}

onMounted(() => {
  // @ts-expect-error
  assignWithOmit(scroll.lenisOptions, props, ['wrapperIs', 'contentIs'])
  // @ts-expect-error
  scroll.lenisOptions.wrapper = wrapper.value
  // @ts-expect-error
  scroll.lenisOptions.content = content.value
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
  <component :is="wrapperIs as string" ref="wrapper" class="vuecomotive-scroll-wrapper" :style="lenisProgressStyle">
    <component :is="contentIs as string" ref="content" class="vuecomotive-scroll-content">
      <slot />
    </component>
  </component>
</template>

<style lang="css">
@import '../../node_modules/locomotive-scroll/dist/locomotive-scroll.css';
</style>
