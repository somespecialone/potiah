---
scroll: true
---

# Scroll View

Main component. 

:::warning Layout change
Due to [Locomotive Scroll](https://scroll.locomotive.ca/docs) implementation it is not possible to change layout
so don't use dynamic rendering or change width/height properties of elements inside `ScrollView`.
:::

## Props

| Property name | Type             | Reactive | Default value | Description                                                                                                                                                        |
|---------------|------------------|:--------:|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| root          | boolean          |    -     | *false*       | Specifies when the component will wrap and listen to the scroll event on the entire document or create wrapper & content elements.                                 |
| cssProgress   | boolean          |    +     | *false*       | Specifies whether or not to display the progress value on the root element in the `--wrapper-progress` CSS custom property (variable). Possible values are 0 to 1. |
| cssDirection  | boolean          |    +     | *false*       | Same as `cssProgress` ⬆️, but in `--scroll-direction` property. Possible values are -1 (up), 1 (down).                                                             |
| wrapperIs     | string/Component |    -     | `div`         | Specifies which component to render. Same as `is` prop on [component](https://vuejs.org/api/built-in-special-elements.html#component).                             |
| contentIs     | string/Component |    -     | `div`         | ⬆️                                                                                                                                                                 |
| horizontal    | boolean          |    -     | *false*       | Scroll orientation. Default - `vertical`                                                                                                                           |

Other props are [options from Lenis](https://scroll.locomotive.ca/docs/#/options?id=lenisoptions) and non-reactive.

## Events

Emit `lenis-scroll` event. Single argument passed to handler
is [Lenis](https://github.com/studio-freight/lenis/blob/main/dist/types/index.d.ts).

```vue {2,4-6,10}
<script setup lang="ts">
import type Lenis from '@studio-freight/lenis';

function onLenisScroll(lenis: Lenis) {
  // do what you want  
}
</script>

<template>
  <ScrollView @lenis-scroll="onLenisScroll">
    <!-- content -->
  </ScrollView>
</template>
```

## Refs to elements

If you need ref to wrapper or/and content elements you can find it on `Lenis` instance after scroll is ready.

```vue {10-14}
<script setup lang="ts">
import { watch } from "vue";

import { useScroll } from "vuecomotive-scroll";

const { scroll, isReady } = useScroll();

watch(isReady, (r) => {
  if (r) {
    scroll.lenis.rootElement
    // or
    scroll.lenis.options.wrapper

    scroll.lenis.options.content
  }
})
</script>
```

:::tip onMounted
Or if you need it eagerly you can get it from `scroll.lenisOptionsGetter` when `ScrollView` is mounted.
:::
