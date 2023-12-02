---
scroll: true
---

# Scroll Component

Component wrapper. Gathering all `data-*` attributes from
[Locomotive Scroll element](https://scroll.locomotive.ca/docs/#/attributes).

Must be rendered inside [ScrollView](scroll-view).

## Component props

| Property name    | Type    | Reactive | Reference / Default value                                                                              | Description                                                      |
|------------------|---------|:--------:|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| is               | string  |    -     | `div`                                                                                                  | Specifies which HTML tag element to render.                      |
| inViewClass      | string  |    +     | `is-inview`                                                                                            | Specifies which class to apply to an element when it is in view. |
| position         | string  |    +     | [data-scroll-position](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-position)         | ⬅️                                                               |
| offset           | string  |    -     | [data-scroll-offset](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-offset)             | ⬅️                                                               |
| repeat           | boolean |    -     | [data-scroll-repeat](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-repeat)             | ⬅️                                                               |
| speed            | number  |    -     | [data-scroll-speed](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-speed)               | ⬅️                                                               |
| cssProgress      | boolean |    +     | [data-scroll-css-progress](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-css-progress) | ⬅️                                                               |
| ignoreFold       | boolean |    +     | [data-scroll-ignore-fold](https://scroll.locomotive.ca/docs/#/attributes?id=data-scroll-ignore-fold)   | ⬅️                                                               |
| enableTouchSpeed | boolean |    +     | [data-enable-touch-speed](https://scroll.locomotive.ca/docs/#/attributes?id=data-enable-touch-speed)   | ⬅️                                                               |

:::tip Reactivity
If you are curious you can experiment and change properties directly on `scrollElement.attributes` objects:

```js
scrollElement.attributes.neededProperty = 'changed value'
```

How to get access to `scrollElement` you can see below in [Expose](#expose) section.
:::

## Events

Emit `progress` and `intersect` events. `progress` event handler will take `IProgressEventPayload` and `intersect` event
handler will take `IIntersectEventPayload`.

> See more [types.ts](https://github.com/somespecialone/potiah/blob/master/lib/src/types.ts)

```vue {2,3,5-7,9-11,15,16}
<script setup lang="ts">
import { ScrollComponent } from "potiah";
import type { IProgressEventPayload, IIntersectEventPayload } from "potiah";

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

All exposed properties available after component is ready. So you need to watch for `ref.value?.scrollComponent` to make
sure of that and then access properties on exposed object.

* `inView` - whether element in viewscreen
* `el` - rendered HTML Element
* `scrollElement` - [ScrollElement](https://github.com/locomotivemtl/locomotive-scroll/blob/v5-beta/src/core/ScrollElement.ts)

Pass `inView` to slot via `v-slot`.

```vue {6-13,17}
<script setup lang="ts">
import { watch } from "vue";

import { ScrollComponent } from "potiah";

const comp = ref<InstanceType<typeof ScrollComponent>>()
watch(
  () => comp.value?.scrollElement, 
  () => {
    comp.value.inView
    comp.value.el
    comp.value.scrollElement
})
</script>

<template>
  <ScrollComponent ref="comp" v-slot="{ inView }">
    <!--  slot components  -->
  </ScrollComponent>
</template>
```
