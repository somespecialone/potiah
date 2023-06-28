---
scroll: true
---

# Getting started

## What is Vuecomotive Scroll?

Vuecomotive Scroll is a thin [Vue.js](https://vuejs.org) wrapper for
precious [Locomotive Scroll v5](https://github.com/locomotivemtl/locomotive-scroll) 🚂.

It utilizes native `Vue` features like components and composables to give max control of `Locomotive Scroll` API to
developer and make easier to integrate it in `Vue` app.

Core of library is simple:

* [scroll](../core/scroll) - 🚂.
* [\<ScrollView />](../core/scroll-view) - wrapper for scrollable scene. It can be whole document or some container
  element inside DOM.
* [\<ScrollComponent />](../core/scroll-component) - `scroll element` within scroll scene. It gathers all `data-*`
  attributes from [Locomotive Scroll element](https://scroll.locomotive.ca/docs/#/attributes).
* [useScroll](../core/use-scroll) - hook that returns `scroll`, `scrollTo` function, refs with scroll data.

## Before starting <Badge type="warning" text="UNSTABLE" />

Project is `unstable` and depends
on [Locomotive Scroll v5 beta](https://github.com/locomotivemtl/locomotive-scroll/tree/v5-beta). So there maybe some
breaking
changes in future unless stable (first major) version/release. 

Kind regards!

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

```html [specified version]
<script src="https://unpkg.com/vuecomotive-scroll@0.1.0"></script>
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
