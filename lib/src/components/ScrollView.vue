<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref, inject } from 'vue'

import type Lenis from '@studio-freight/lenis'
import type { ILenisOptions } from 'locomotive-scroll/dist/types/types'

import { scrollInstKey, directionIKey, isReadyKey } from '../keys'
import { assignWithOmit } from '../utils'

export interface IComponentProps {
  wrapperIs?: keyof HTMLElementTagNameMap | string
  contentIs?: keyof HTMLElementTagNameMap | string
}

// @ts-ignore
const props = withDefaults(defineProps<IComponentProps & Omit<ILenisOptions, 'wrapper' | 'content'>>(), {
  wrapperIs: 'main',
  contentIs: 'div',
  smoothWheel: true,
  normalizeWheel: true
})

const emit = defineEmits<{ (e: 'lenis-scroll', lenis: Lenis): void }>()

const wrapper = ref<HTMLElement>()
const content = ref<HTMLElement>()

const scroll = inject(scrollInstKey)!
const isReady = inject(isReadyKey)!
const direction = inject(directionIKey)!

function scrollCallback(v: Lenis) {
  direction.value != v.direction && (direction.value = v.direction)
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
  <component :is="wrapperIs as string" ref="wrapper" class="vuecomotive-scroll-wrapper">
    <component :is="contentIs as string" ref="content" class="vuecomotive-scroll-content">
      <slot />
    </component>
  </component>
</template>
