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
> ChatGPT

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

Also note, that you need to load [lenis styles](https://github.com/studio-freight/lenis#considerations) from CDN too

```html
<link rel="stylesheet" href="https://unpkg.com/potiah/dist/lenis.css">
```

## Setup 🛠️

If you use package manager import [lenis styles](https://github.com/studio-freight/lenis#considerations) in your code:

```js
import 'potiah/dist/lenis.css'
```

Create a scroll instance and pass it to the app as a plugin:

```js {3,4,9,11}
import { createApp } from 'vue'

import 'potiah/dist/lenis.css'  // if you use package manager
import createPotiah from 'potiah'

import App from './App.vue'

const app = createApp(App)
const scroll = createPotiah()

app.use(scroll)
app.mount('#app')
```

:::details Creating instance arguments
`createPotiah` takes options object arg.

[//]: # (TODO link to reference args)
:::
