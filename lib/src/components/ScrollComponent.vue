<script setup lang="ts">
import { onMounted, ref, shallowRef, inject, watch, watchEffect, computed, onBeforeUnmount } from 'vue'

import type ScrollElement from 'locomotive-scroll/dist/types/core/ScrollElement'

import type { IScrollElementProps, IIntersectEventPayload, IProgressEventPayload, IComponentProps } from '../types'

import { instKey } from '../keys'
import { boolToDataAttr } from '../utils'

// TODO Do I need to handle css progress by myself?
// TODO Boolean prop to enable/disable progress event emitting is more sufficient than emitting progress event by default in each component
const props = withDefaults(defineProps<IComponentProps & IScrollElementProps>(), {
  is: 'div',
  inViewClass: 'is-inview'
})
const dataRepeat = computed(() => boolToDataAttr(props.repeat))
const dataCssProgress = computed(() => boolToDataAttr(props.cssProgress))
const dataIgnoreFold = computed(() => boolToDataAttr(props.ignoreFold))
const dataTouchSpeed = computed(() => boolToDataAttr(props.enableTouchSpeed))

const el = ref<HTMLElement>()

const emit = defineEmits<{
  (e: 'intersect', data: IIntersectEventPayload): void
  (e: 'progress', data: IProgressEventPayload): void
}>()

const potiah = inject(instKey)!
const eventId = potiah._generateId()
const intersectEventName = 'r-iE-' + eventId
const progressEventName = 'r-pE-' + eventId

const scrollElement = shallowRef<ScrollElement>()
const inView = ref(false)

watchEffect(() => {
  if (potiah.scroll?.coreInstance) {
    scrollElement.value = potiah.scroll.coreInstance.scrollElements.find((v) => v.$el === el.value)
  }
})

function handleIntersectEvent({ detail }: CustomEvent<IIntersectEventPayload>) {
  inView.value = detail.way === 'enter'
  emit('intersect', detail)
}

function handleProgressEvent({ detail }: CustomEvent<IProgressEventPayload>) {
  emit('progress', detail)
}

onMounted(() => {
  // @ts-ignore
  window.addEventListener(intersectEventName, handleIntersectEvent)
  // @ts-ignore
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
    props.enableTouchSpeed
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
  // @ts-ignore
  window.removeEventListener(intersectEventName, handleIntersectEvent)
  // @ts-ignore
  window.removeEventListener(progressEventName, handleProgressEvent)
})

defineExpose({ el, scrollElement, inView })
</script>

<template>
  <component
    class="scroll-component"
    :class="{ [inViewClass]: inView }"
    :is="is"
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
