---
scroll: true
---

<script setup>
import { inject, computed } from "vue"
import { useScroll } from "vuecomotive-scroll"

const { direction, isScrolling } = useScroll()

import { DEF_DUR } from "../.vitepress/constants"

const duration = inject("duration")

const scrollText = computed(() => {
    let text = "⏺️ not scrolling" 
    if (isScrolling.value) {
        text = direction.value === 1 ? "⬇️ scrolling down" : "⬆️ scrolling up";
    }

    return text;
});
</script>

# Creating scroll scene

There will be only simple code examples to introduce the basic concepts and capabilities of `VuecomotiveScroll`.

## Basic

Wrap all your app components with [ScrollView](../core/scroll-view).

:::tip Typings
The `ScrollView` and `ScrollComponent` components are registered and available globally, but if your IDE complains about
the
typing, you can import them.
:::

```vue {2,6-8}
<script setup lang="ts">
import { ScrollView } from 'vuecomotive-scroll' // optional for typings
</script>

<template>
  <ScrollView root>
    <!-- your components/content -->
  </ScrollView>
</template>
```

This will enable smooth scroll from [lenis](https://github.com/studio-freight/lenis) on whole document.
The `root` prop means that `scroll` will use `window` as a wrapper and `document.documentElement` as the scrollable
content and won't create any additional HTML elements.

:::details Attributes
Actually you can define `data-*` attributes on components/elements within `ScrollView` and `Locomotive Scroll` will
work. But for this purpose the library provides `ScrollComponent` component with many features.
[See there](../core/scroll-component).
:::

:::warning Single scroll instance
There is single available instance of scroll for each app. So, if You mount multiple `ScrollView` components at once,
the
latter will work and previous not.
:::

## Reactive prop

`ScrollView` properties include
some [lenis instance options](https://github.com/studio-freight/lenis#instance-settings).

```vue {4,9-11}
<script setup lang="ts">
import { ref } from 'vue'

const duration = ref(1.2)
</script>

<template>
  <ScrollView root :duration="duration">
    <button @click="duration++">+</button>
    <button @click="duration--">-</button>
    <button @click="duration = 1.2">reset</button>
  </ScrollView>
</template>
```

For example, current page content is rendered inside `ScrollView`, which accepts reactive prop `duration`.
Try to change `duration` ref value with the buttons below and see how the scrolling behavior changes.

:::tip Value
Duration of scroll animation is **{{ duration.toFixed(1) }}s** .
:::

<span class="dur-buttons">
  <DocButton @click="duration++">+</DocButton>
  <DocButton @click="duration--">-</DocButton>
  <DocButton @click="duration = DEF_DUR">reset</DocButton>
</span>

> See also [ScrollView](../core/scroll-view)

## More advanced

[ScrollComponent](../core/scroll-component) gathering `data-*` attributes from
[Locomotive Scroll element](https://scroll.locomotive.ca/docs/#/attributes).

`ScrollComponent` can be as deep as you need it to be, until it is rendered within `ScrollView`.

You can place your components / content inside `ScrollComponent`. In fact, `ScrollComponent` is just a wrapper with
native HTML element inside. The `is` prop specifies which HTML element will be rendered.

:::warning Reactivity
Not all props are reactive (react to updates)! You can see details on [component page](../core/scroll-component).
:::

```vue {3-8}
<template>
  <ScrollView root>
    <ScrollComponent is="section" class="first-scroll-component" :speed="0.2">
      <!-- your components/content -->
    </ScrollComponent>
    <ScrollComponent is="div" class="second-scroll-component" position="start,end">
      <!-- your components/content -->
    </ScrollComponent>
    <!-- your components/content -->
  </ScrollView>
</template>
```

> See also [ScrollComponent](../core/scroll-component)

## Composable

[useScroll](../core/use-scroll) - composable that returns `scroll` instance, `scrollTo` function, `direction`,
`isScrolling`, `isReady` refs.

`scrollTo` (bounded `scroll.scrollTo`) can be used to scroll target element.

:::tip scrollTo
This page uses the `scrollTo` function to scroll to anchors by clicking on links in the right bar or on headers anchors.
:::

```vue {4,6,8-15,20}
<script setup lang="ts">
import { computed } from "vue";

import { useScroll } from "vuecomotive-scroll";

const { scrollTo, direction, isScrolling } = useScroll();

const scrollText = computed(() => {
  let text = "⏺️ not scrolling";
  if (isScrolling.value) {
    text = direction.value == 1 ? "⬇️ scrolling down" : "⬆️ scrolling up";
  }

  return text;
});
</script>

<template>
  <ScrollView root>
    <span>{{ scrollText }}</span>
    <!-- your components/content -->
  </ScrollView>
</template>
```

With the code example above, we can make a computed property that gives us information about the current scrolling
state,
as shown below:

:::tip You are: {{ scrollText }}
:::

> See also [useScroll](../core/use-scroll)

## Non-root view

`ScrollView` can be a non-root component. Next means that wrapper and content elements will be rendered.

For scrolling to work specify `height` and `overflow` style properties for `ScrollView` wrapper element.

```vue {15-16}
<template>
  <header>
    <!-- header content -->
  </header>
  <ScrollView class="scroll-wrapper">
    <!-- scroll content -->
  </ScrollView>
  <footer>
    <!-- footer content -->
  </footer>
</template>

<style>
.scroll-wrapper {
  height: 80vh;
  overflow-y: hidden;
}
</style>
```

> See also [ScrollView](../core/scroll-view)

## Global properties

There are two global properties of app available in `template`:

* `$scrollTo` - same as the `scrollTo` function returned from `useScroll`
* `$scroll` - `scroll` instance

```vue {3,4}
<template>
  <ScrollView root>
    <button @click="$scrollTo('#target-id')">Scroll To</button>
    <span>{{ $scroll.isScrolling }}</span>
    <!-- scroll content -->
  </ScrollView>
</template>
```

<style>
  .dur-buttons {
    display: flex;
    gap: 2%;
    justify-content: center;
}
</style>

## Try It Online

If you want to see how things works you can try it directly in your browser on
[StackBlitz](https://stackblitz.com/github/somespecialone/vuecomotive-scroll/tree/master/demo/?file=src%2FApp.vue)

## Limitations

:::warning Dynamic rendering ⚠️
For [now](https://scroll.locomotive.ca/docs/#/playground) it is not possible to dynamically change layout
inside `ScrollView`.

Do not use conditional rendering (`v-if`) or change layout (`v-show`) inside view on components/elements that have
width/height, change these properties dynamically (after rendering) of elements within `ScrollView`.

Solution depends on [Locomotive Scroll](https://scroll.locomotive.ca/docs) implementation and may come later.
:::
