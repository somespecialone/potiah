---
scroll: true
---

<script setup>
import pkg from "../../lib/package.json";
</script>

# Getting started

## What is Potiah?

_Potiah_ (pronounced `/pot'jʌɦ/`, means _train_ in Ukrainian) is a thin [Vue.js](https://vuejs.org) wrapper for
precious [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) 🚂.

> _"It utilizes native `Vue` features such as components and composables to give maximum control over `LocomotiveScroll`
> API to developer and make it easier to integrate it into a `Vue` app."_
>
> &ndash; ChatGPT

Core of the library:

* [Potiah](../core/potiah) - 🚂.
* [\<ScrollView />](../core/scroll-view) - wrapper for scrollable scene. It can be whole document or any container
  element inside the DOM.
* [\<ScrollComponent />](../core/scroll-component) - `scroll element` within scroll scene. It gathers all `data-*`
  attributes from [Locomotive Scroll element](https://scroll.locomotive.ca/docs/#/attributes).
* [useScroll](../core/use-potiah) - composable that returns current `Potiah` instance, `scrollTo` function, refs with scroll data.

## Before starting <Badge type="warning" text="UNSTABLE" />

The project is unstable and depends
on [Locomotive Scroll v5 beta](https://github.com/locomotivemtl/locomotive-scroll/tree/v5-beta).
So there might be some breaking changes in the future unless stable (first major) version is released.

Best regards!

## Installation

### Prerequisites

* [Vue](https://vuejs.org) version 3.3.0 or higher.

### Bundler / package manager

:::code-group

```sh [npm]
npm install potiah
```

```sh [pnpm]
pnpm add potiah
```

```sh [yarn]
yarn add potiah
```

:::

### Direct Download / CDN

:::code-group

```html-vue [specified version]
<script src="https://unpkg.com/potiah@{{ pkg.version }}"></script>
```

```html [latest]
<script src="https://unpkg.com/potiah"></script>
```

:::

Here [unpkg](https://unpkg.com) is used as the CDN provider, but you can use any other CDN that serves npm packages.
All top-level APIs are exposed as properties of the global `Potiah` object.

`umd` script inside use global `Vue` object, so don't forget to add `vue` as below:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<!-- Potiah could be place there -->
```

If you want to use library via native **ES modules** like `Vue`[there](https://vuejs.org/guide/quick-start.html#using-the-es-module-build)
you can import it from CDN **ES build** using
[importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
(because dependencies externalized in **ES Build**):

```html-vue
<script type='importmap'>
{
  "imports": {
    "@studio-freight/lenis": "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/dist/lenis.modern.mjs",
    "locomotive-scroll": "https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/dist/locomotive-scroll.modern.mjs",
  }
}
</script>

<script type="module">
  import { createScroll } from 'https://unpkg.com/potiah@{{ pkg.version }}/dist/potiah.mjs'
</script>
```

Or even import it natively:

```html-vue
<script type='importmap'>
{
  "imports": {
    "@studio-freight/lenis": "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/dist/lenis.modern.mjs",
    "locomotive-scroll": "https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/dist/locomotive-scroll.modern.mjs",
    "potiah": "https://unpkg.com/potiah@{{ pkg.version }}/dist/potiah.mjs" // [!code ++]
  }
}
</script>

<script type="module">
  import { createScroll } from 'https://unpkg.com/potiah@{{ pkg.version }}/dist/potiah.mjs' // [!code --]
  import { createScroll } from 'potiah' // [!code ++]
</script>
```

❗ Also note, that you need to load [lenis styles](https://github.com/studio-freight/lenis#considerations) from CDN too

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/bundled/locomotive-scroll.css">
```

## Setup 🛠️

If you use package manager import [lenis styles](https://github.com/studio-freight/lenis#considerations) in your code:

```js
import 'locomotive-scroll/locomotive-scroll.css'
```

Create a scroll instance and pass it to the app as a plugin:

```js {3,4,9,11}
import { createApp } from 'vue'

import 'locomotive-scroll/locomotive-scroll.css' // if you install trough package manager  
import { createPotiah } from 'potiah'

import App from './App.vue'

const app = createApp(App)
const potiah = createPotiah()

app.use(potiah)
app.mount('#app')
```

:::tip Creating instance arguments
`createPotiah` takes default [options from LocomotiveScroll](https://scroll.locomotive.ca/docs/#/options?id=triggerrootmargin) as argument and will be passed to every created
**LocomotiveScroll** instance (every mounted [ScrollView](../core/scroll-view))
:::
