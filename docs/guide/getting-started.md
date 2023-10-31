---
scroll: true
---

<script setup>
import pkg from "../../lib/package.json";
</script>

# Getting started

## What is Vuecomotive Scroll?

Vuecomotive Scroll is a thin [Vue.js](https://vuejs.org) wrapper for
precious [Locomotive Scroll v5](https://github.com/locomotivemtl/locomotive-scroll) 🚂.

It utilizes native `Vue` features such as components and composables to give maximum control over `LocomotiveScroll` API
to developer and make it easier to integrate it into a `Vue` app.

Core of the library:

* [scroll](../core/scroll) - 🚂.
* [\<ScrollView />](../core/scroll-view) - wrapper for scrollable scene. It can be whole document or any container
  element inside the DOM.
* [\<ScrollComponent />](../core/scroll-component) - `scroll element` within scroll scene. It gathers all `data-*`
  attributes from [Locomotive Scroll element](https://scroll.locomotive.ca/docs/#/attributes).
* [useScroll](../core/use-scroll) - composable that returns `scroll`, `scrollTo` function, refs with scroll data.

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
npm install vuecomotive-scroll
```

```sh [pnpm]
pnpm add vuecomotive-scroll
```

```sh [yarn]
yarn add vuecomotive-scroll
```

:::

### Direct Download / CDN

:::code-group

```html-vue [specified version]
<script src="https://unpkg.com/vuecomotive-scroll@{{ pkg.version }}"></script>
```

```html [latest]
<script src="https://unpkg.com/vuecomotive-scroll"></script>
```

:::

Also note, that you need to load [lenis styles](https://github.com/studio-freight/lenis#considerations) from CDN too

```html
<link rel="stylesheet" href="https://unpkg.com/vuecomotive-scroll/dist/lenis.css">
```

## Setup 🛠️

If you use package manager import [lenis styles](https://github.com/studio-freight/lenis#considerations) in your code:

```js
import 'vuecomotive-scroll/dist/lenis.css'
```

Create a scroll instance and pass it to the app as a plugin:

```js {3,4,9,11}
import { createApp } from 'vue'

import 'vuecomotive-scroll/dist/lenis.css'  // if you use package manager
import createVuecomotiveScroll from 'vuecomotive-scroll'

import App from './App.vue'

const app = createApp(App)
const scroll = createVuecomotiveScroll()

app.use(scroll)
app.mount('#app')
```

:::details Creating instance arguments
`createVuecomotiveScroll` takes options object arg.

[//]: # (TODO link to reference args)
:::
