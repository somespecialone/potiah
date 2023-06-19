<script setup lang="ts">
import { onMounted, ref, shallowRef, inject, watch, watchEffect, onUnmounted, computed } from 'vue'

import type ScrollElement from 'locomotive-scroll/dist/types/core/ScrollElement'

import type { IScrollElementProps, IIntersectEventPayload, IProgressEventPayload } from '../types'

import { isReadyKey, scrollInstKey } from '../keys'
import { boolToDataAttr } from '../utils'

const INTERSECT_EVENT = 'intersectEvent'
const PROGRESS_EVENT = 'progressEvent'

export interface IComponentProps {
  is?: keyof HTMLElementTagNameMap | string
}

// @ts-ignore
const props = withDefaults(defineProps<IComponentProps & IScrollElementProps>(), {
  is: 'div'
})
const progressEvent = computed(() => (props.eventProgress ? PROGRESS_EVENT : null))
const dataRepeat = computed(() => boolToDataAttr(props.repeat))
const dataCssProgress = computed(() => boolToDataAttr(props.cssProgress))
const dataIgnoreFold = computed(() => boolToDataAttr(props.ignoreFold))
const dataTouchSpeed = computed(() => boolToDataAttr(props.touchSpeed))

const el = ref<HTMLElement>()

const emit = defineEmits<{
  (e: 'intersect', data: IIntersectEventPayload): void
  (e: 'progress', data: IProgressEventPayload): void
}>()

const scroll = inject(scrollInstKey)!
const isReady = inject(isReadyKey)!

const scrollElement = shallowRef<ScrollElement>()

watchEffect(() => {
  // @ts-expect-error
  isReady.value && (scrollElement.value = scroll.coreInstance.scrollElements.find((v) => v.$el.id === el.value.id))
})

const inView = ref(false)

function handleScrollEvent({ detail }: CustomEvent<IIntersectEventPayload>) {
  inView.value = detail.way == 'enter'
  emit('intersect', detail)
}

function handleProgressEvent({ detail }: CustomEvent<IProgressEventPayload>) {
  emit('progress', detail)
}

onMounted(() => {
  window.addEventListener(INTERSECT_EVENT, handleScrollEvent)
  props.eventProgress && window.addEventListener(PROGRESS_EVENT, handleProgressEvent)
})

watch(
  () => props.eventProgress,
  (e) => {
    if (scrollElement.value) {
      if (e) {
        scrollElement.value.attributes.scrollEventProgress = PROGRESS_EVENT
        window.addEventListener(PROGRESS_EVENT, handleProgressEvent)
      } else {
        // @ts-ignore
        scrollElement.value.attributes.scrollEventProgress = null
        window.removeEventListener(PROGRESS_EVENT, handleProgressEvent)
      }
    }
  }
)

watch(
  () => [
    props.position,
    props.offset,
    // props.inViewClass,
    // props.repeat,
    // props.speed,
    props.cssProgress,
    props.ignoreFold,
    props.touchSpeed
  ],
  ([
    pos,
    offset,
    // cl,
    // scrollRepeat,
    // scrollSpeed,
    scrollCssProgress,
    scrollIgnoreFold,
    scrollEnableTouchSpeed
  ]) => {
    if (scrollElement.value) {
      // https://github.com/locomotivemtl/locomotive-scroll/blob/v5-beta/src/core/ScrollElement.ts#L86
      Object.assign(scrollElement.value.attributes, {
        scrollPosition: pos ?? 'start,end',
        scrollOffset: offset ?? '0,0',
        // scrollClass: cl ?? 'is-inview',
        // scrollRepeat,
        // scrollSpeed,
        scrollCssProgress,
        scrollIgnoreFold,
        scrollEnableTouchSpeed
      })
    }
  }
)

onUnmounted(() => {
  window.removeEventListener(INTERSECT_EVENT, handleScrollEvent)
  props.eventProgress && window.removeEventListener(PROGRESS_EVENT, handleProgressEvent)
})

defineExpose({ el, scrollElement, inView })
</script>

<template>
  <component
    class="scroll-component"
    :is="is as string"
    ref="el"
    data-scroll
    :data-scroll-call="INTERSECT_EVENT"
    :data-scroll-event-progress="progressEvent"
    :data-scroll-position="position"
    :data-scroll-repeat="dataRepeat"
    :data-scroll-css-progress="dataCssProgress"
    :data-scroll-ignore-fold="dataIgnoreFold"
    :data-enable-touch-speed="dataTouchSpeed"
    :data-scroll-offset="offset"
    :data-scroll-class="inViewClass"
    :data-scroll-speed="speed"
  >
    <slot :inView="inView" />
  </component>
</template>
