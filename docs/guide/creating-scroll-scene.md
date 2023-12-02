---
scroll: true
---

<script setup>
import { inject, computed } from "vue"
import { usePotiah } from "potiah"

const { direction, isScrolling } = usePotiah()

import { DEF_DUR } from "../.vitepress/constants"

const duration = inject("duration")

const scrollText = computed(() => {
    let text = "⏺️ not scrolling" 
    if (isScrolling.value) {
        text = direction.value === 1 ? "⬇️ scrolling down" : "⬆️ scrolling up";
    }

    return text;
});

const vel = inject('velocity')
</script>

# Creating scroll scene

There will be only simple code examples to introduce the basic concepts and capabilities of `Potiah`.

## Basic

Wrap all your app components with [ScrollView](../core/scroll-view).

```vue {2,6-8}
<script setup lang="ts">
import { ScrollView } from 'potiah'
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

:::tip Smooth scroll and nothing else
If smooth scroll from `Lenis` is all what you want, you can stop right there 😁
:::

:::info Attributes
Actually you can define `data-*` attributes on components/elements within `ScrollView` and `Locomotive Scroll` will
work. But for this purpose the library provides `ScrollComponent` component with many features.
[Look here](../core/scroll-component).
:::

:::warning Single scroll instance
There is single available instance of `Potiah` for each app. So, if You mount multiple `ScrollView` components at once,
the latter will work and previous not.
:::

## Reactive prop

`ScrollView` properties include some
[Lenis instance options](https://github.com/studio-freight/lenis#instance-settings).

```vue {5,9-12}
<script setup lang="ts">
import { ref } from 'vue'
import { ScrollView } from 'potiah'

const duration = ref(1.2)
</script>

<template>
  <ScrollView root :duration="duration">
    <button @click="duration++">+</button>
    <button @click="duration--">-</button>
    <button @click="duration = 1.2">RESET</button>
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
  <DocButton @click="duration = DEF_DUR">RESET</DocButton>
</span>

> See also [ScrollView](../core/scroll-view)

## More advanced

[ScrollComponent](../core/scroll-component) gathering `data-*` attributes from
[LocomotiveScroll element](https://scroll.locomotive.ca/docs/#/attributes).

`ScrollComponent` can be as deep as you need it to be, until it is rendered within `ScrollView`.

You can place your components / content inside `ScrollComponent`. In fact, `ScrollComponent` is just a wrapper with
native HTML element inside. The `is` argument specifies which HTML element will be rendered.

:::warning Reactivity
Not all props are reactive (react to updates)! You can see details on [component page](../core/scroll-component).
:::

```vue {7-12}
<script setup lang="ts">
import { ScrollView, ScrollComponent } from 'potiah'
</script>

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

[usePotiah](../core/use-potiah) - composable that returns `Potiah` instance, `scrollTo` function, `direction`,
`isScrolling` refs.

`scrollTo` can be used to scroll target element or specified value in pixels.

:::tip scrollTo
This page uses the `scrollTo` function to scroll to anchors by clicking on links in the right bar or on headers anchors.
:::

```vue {4,6,8-16,21}
<script setup lang="ts">
import { computed } from "vue";

import { usePotiah, ScrollView } from "potiah";

const { direction, isScrolling, potiah } = usePotiah();

const scrollText = computed(() => {
  let text = "⏺️ not scrolling";
  if (isScrolling.value) { // or potiah.isScrolling
    // or potiah.direction
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
state, as shown below:

:::tip You are: {{ scrollText }}
:::

> See also [usePotiah](../core/use-potiah)

## Event

`ScrollView` emits `lenis-scroll` event when perform smooth scrolling. Therefore, you can use values from event to make
animations, transitions, change states, anything what possible 🙂.

```vue {}
<script setup lang="ts">
import { ref } from "vue";

import { ScrollView } from "potiah";

const velocity = ref(0)
</script>

<template>
  <ScrollView root @lenis-scroll='(l) => (velocity = l.velocity)'>
    <span>{{ velocity }}</span>
    <!-- your components/content -->
  </ScrollView>
</template>
```

:::tip Velocity is {{ vel }}
:::

:::warning Bad practice
Example above use reactive [ref](https://vuejs.org/api/reactivity-core.html#ref) as **velocity** value for simplicity.
This can result in pure performance due to the high frequency of the emitted event. You want to avoid this and change 
the DOM element property directly in such a case as above.
:::

## Non-root view

`ScrollView` can be a non-root component. Next means that wrapper and content elements will be rendered.

For scrolling to work specify `height` and `overflow` style properties for `ScrollView` wrapper element.

```vue {19-20}
<script setup lang="ts">
import { ScrollView } from 'potiah'
</script>

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

There are two global properties of the app available in `template`:

* `$scrollTo` - same as the `scrollTo` function returned from `usePotiah` or `potiah.scrollTo`
* `$potiah` - `Potiah` instance

```vue {7,8}
<script setup lang="ts">
import { ScrollView } from 'potiah'
</script>

<template>
  <ScrollView root>
    <button @click="$scrollTo('#target-id')">Scroll To</button>
    <span>{{ $potiah.isScrolling }}</span>
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

If you want to see how things works you can try it directly in your browser

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/somespecialone/potiah/tree/main/playground/?file=src%2Fpages%2FHomeRoute.vue&title=Potiah%20Playground)

## Limitations

:::warning Dynamic rendering ⚠️
For **now** it is not possible to dynamically change layout
inside `ScrollView`.

[Read more here](../core/scroll-view)
:::

> See also [limitations](https://scroll.locomotive.ca/docs/#/limitations)
