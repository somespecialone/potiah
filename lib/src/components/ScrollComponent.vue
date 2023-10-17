<script setup lang="ts">
import { onMounted, ref, shallowRef, inject, watch, watchEffect, computed, onBeforeUnmount } from 'vue'

import type ScrollElement from 'locomotive-scroll/dist/types/core/ScrollElement'

import type { IScrollElementProps, IIntersectEventPayload, IProgressEventPayload } from '../types'

import { scrollInstKey } from '../keys'
import { boolToDataAttr } from '../utils'
import { INTERSECT_EVENT_SUFFIX, PROGRESS_EVENT_SUFFIX } from '../constants'

export interface IComponentProps {
  is?: keyof HTMLElementTagNameMap | string
}

// TODO Do I need to handle css progress by myself?
// TODO Boolean prop to enable/disable progress event emitting is more sufficient than emitting progress event by default in each component
// @ts-ignore
const props = withDefaults(defineProps<IComponentProps & IScrollElementProps>(), {
  is: 'div',
  inViewClass: 'is-inview'
})
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
const eventId = scroll.getId()
const intersectEventName = INTERSECT_EVENT_SUFFIX + eventId
const progressEventName = PROGRESS_EVENT_SUFFIX + eventId

const scrollElement = shallowRef<ScrollElement>()
const inView = ref(false)

watchEffect(() => {
  if (scroll.isReady.value) {
    scrollElement.value = scroll.scrollElements.find((v) => v.$el === el.value)
  }
})

function handleScrollEvent({ detail }: CustomEvent<IIntersectEventPayload>) {
  inView.value = detail.way === 'enter'
  emit('intersect', detail)
}

function handleProgressEvent({ detail }: CustomEvent<IProgressEventPayload>) {
  emit('progress', detail)
}

onMounted(() => {
  window.addEventListener(intersectEventName, handleScrollEvent)
  window.addEventListener(progressEventName, handleProgressEvent)
})

watch(
  () => [
    props.position,
    props.offset,
    // props.repeat,
    // props.speed,
    props.cssProgress,
    props.ignoreFold,
    props.touchSpeed
  ],
  ([
    pos,
    offset,
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
        // scrollRepeat,
        // scrollSpeed,
        scrollCssProgress,
        scrollIgnoreFold,
        scrollEnableTouchSpeed
      })
    }
  }
)

onBeforeUnmount(() => {
  window.removeEventListener(intersectEventName, handleScrollEvent)
  window.removeEventListener(progressEventName, handleProgressEvent)
})

defineExpose({ el, scrollElement, inView })
</script>

<template>
  <component
    class="scroll-component"
    :class="{ [inViewClass]: inView }"
    :is="is as string"
    ref="el"
    data-scroll
    :data-scroll-call="intersectEventName"
    :data-scroll-event-progress="progressEventName"
    :data-scroll-position="position"
    :data-scroll-repeat="dataRepeat"
    :data-scroll-css-progress="dataCssProgress"
    :data-scroll-ignore-fold="dataIgnoreFold"
    :data-enable-touch-speed="dataTouchSpeed"
    :data-scroll-offset="offset"
    :data-scroll-speed="speed"
  >
    <slot :inView="inView" />
  </component>
</template>
