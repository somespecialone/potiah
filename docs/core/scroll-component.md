---
scroll: true
---

# Scroll Component

Component wrapper. Gathering all `data-*` attributes from
[Locomotive Scroll element](https://scroll.locomotive.ca/docs/#/attributes).

Must be rendered inside [ScrollView](scroll-view).

## Component props

| Property name | Type             | Reactive | Reference / Default value                                                                              | Description                                                                                                                            |
|---------------|------------------|:--------:|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| is            | string/Component |    -     | `div`                                                                                                  | Specifies which component to render. Same as `is` prop on [component](https://vuejs.org/api/built-in-special-elements.html#component). |
| inViewClass   | string           |    +     | `is-inview`                                                                                            | Specifies which class to apply to an element when it is in view.                                                                       |
| position      | string           |    +     | [data-scroll-position](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-position)         | ⬅️                                                                                                                                     |
| offset        | string           |    -     | [data-scroll-offset](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-offset)             | ⬅️                                                                                                                                     |
| repeat        | boolean          |    -     | [data-scroll-repeat](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-repeat)             | ⬅️                                                                                                                                     |
| speed         | number           |    -     | [data-scroll-speed](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-speed)               | ⬅️                                                                                                                                     |
| cssProgress   | boolean          |    +     | [data-scroll-css-progress](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-css-progress) | ⬅️                                                                                                                                     |
| ignoreFold    | boolean          |    +     | [data-scroll-ignore-fold](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-ignore-fold)   | ⬅️                                                                                                                                     |
| touchSpeed    | boolean          |    +     | [data-enable-touch-speed](https://scroll.locomotive.ca/docs/#/attributes?id=data-enable-touch-speed)   | ⬅️                                                                                                                                     |

## Events

Emit `progress` and `intersect` events.
`progress` event handler will
take [IProgressEventPayload](https://github.com/somespecialone/vuecomotive-scroll/blob/master/lib/src/types.ts)
and `intersect` event handler will
take [IIntersectEventPayload](https://github.com/somespecialone/vuecomotive-scroll/blob/master/lib/src/types.ts)

```vue {2,4-6,8-10,14,15}
<script setup lang="ts">
import type { IProgressEventPayload, IIntersectEventPayload } from "vuecomotive-scroll";

function handleProgress({ target, progress }: IProgressEventPayload) {
  // some work...
}

function handleIntersect({ target, way, from }: IIntersectEventPayload) {
  // and there
}
</script>

<template>
  <ScrollComponent @progress="handleProgress" />
  <ScrollComponent @intersect="handleIntersect" />
</template>
```

## Expose

* `inView` - ref with boolean
* `el` - ref to HTMLElement
* `scrollElement` - [ScrollElement](https://github.com/locomotivemtl/locomotive-scroll/blob/v5-beta/src/core/ScrollElement.ts)

Pass only `inView` to slot via `v-slot`.

```vue {6-8,13}
<script setup lang="ts">
import { onMounted } from "vue"

const comp = ref()
onMounted(() => {
  comp.inView
  comp.el
  comp.scrollElement
})
</script>

<template>
  <ScrollComponent ref="comp" v-slot="{ inView }">
    <!--  slot components  -->
  </ScrollComponent>
</template>
```
