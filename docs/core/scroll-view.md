---
scroll: true
---

# Scroll View

Main component. 

:::warning Layout change
Due to [LocomotiveScroll](https://scroll.locomotive.ca/docs) implementation it is not possible to change layout.

To **prevent unexpected behaviour do not use conditional rendering** (`v-if`) or change layout (`v-show`) inside view on
components/elements that have width/height, change these properties dynamically (after rendering) of elements within
`ScrollView` **IF** there is `ScrollComponent`s.

Solution depends on the bravery of [LocomotiveScroll team](https://github.com/locomotivemtl) and may
come later, thanks them for their work!
:::

## Props

| Property name | Type    | Reactive | Default value | Description                                                                                                                                                     |
|---------------|---------|:--------:|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| root          | boolean |    -     | *false*       | Specifies when the component will wrap and listen to the scroll event on the entire document or create wrapper & content elements.                              |
| cssProgress   | boolean |    +     | *false*       | Specifies whether or not to display the progress value on the root element in the `--view-progress` CSS custom property (variable). Possible values are 0 to 1. |
| cssDirection  | boolean |    +     | *false*       | Same as `cssProgress` ⬆️, but in `--scroll-direction` property. Possible values are -1 (up), 1 (down).                                                          |
| wrapperIs     | string  |    -     | `div`         | Specifies which HTML tag element to render.                                                                                                                     |
| contentIs     | string  |    -     | `div`         | ⬆️                                                                                                                                                              |
| horizontal    | boolean |    -     | *false*       | Scroll orientation. Default - `vertical`                                                                                                                        |
| duration      | number  |    +     | 1             | Scroll duration. See more [here](https://scroll.locomotive.ca/docs/#/options?id=lenisoptions)                                                                   |

Other props are [options from Lenis](https://scroll.locomotive.ca/docs/#/options?id=lenisoptions),
[options from LocomotiveScroll](https://scroll.locomotive.ca/docs/#/options?id=triggerrootmargin).

:::tip Non-reactive
All other props are non-reactive. If you are curious you can experiment and change properties directly on 
`LocomotiveScroll.lenisOptions` and `Lenis.options` objects:

```js
potiah.scroll.lenisOptions.neededProperty = 'changed value'
potiah.scroll.lenisInstance.options.neededProperty = 'changed value'
```
:::

## Events

Emit `lenis-scroll` event. Single argument passed to handler
is [Lenis](https://github.com/studio-freight/lenis/blob/main/dist/types/index.d.ts).

```vue {2,5-7,11}
<script setup lang="ts">
import type Lenis from '@studio-freight/lenis';
import { ScrollView } from "potiah";

function onLenisScroll({ progress, ...otherLenisProperties }: Lenis) {
  // do what you want  
}
</script>

<template>
  <ScrollView @lenis-scroll="onLenisScroll">
    <!-- content -->
  </ScrollView>
</template>
```

## Access to elements

If you need access to wrapper or/and content elements you can find it on `Lenis` instance after scroll is ready.

```vue {10-14}
<script setup lang="ts">
import { watch } from "vue";

import { usePotiah } from "potiah";

const { potiah } = usePotiah();

watch(() => potiah.scroll, (s) => {
  if (s) {
    potiah.scroll.lenisInstance.rootElement
    // or
    potiah.scroll.lenisInstance.options.wrapper

    potiah.scroll.lenisInstance.options.content
  }
}, { immediate: true })
</script>
```
