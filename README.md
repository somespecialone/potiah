<p align="center">
  <a href="https://potiah.somespecial.one" target="_blank" rel="noopener noreferrer">
    <img width="240" src="https://raw.githubusercontent.com/somespecialone/potiah/main/docs/public/logo.svg" alt="potiah logo">
  </a>
  <h1 align="center">Potiah</h1>
</p>

[![Made in Ukraine](https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7)](https://stand-with-ukraine.pp.ua)
[![license](https://img.shields.io/github/license/somespecialone/potiah)](https://github.com/somespecialone/potiah/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/potiah)](https://www.npmjs.com/package/potiah)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/potiah)](https://bundlephobia.com/package/potiah)
[![Docs](https://github.com/somespecialone/potiah/actions/workflows/docs.yml/badge.svg)](https://github.com/somespecialone/potiah/actions/workflows/docs.yml)
[![Publish](https://github.com/somespecialone/potiah/actions/workflows/publish.yml/badge.svg)](https://github.com/somespecialone/potiah/actions/workflows/publish.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/somespecialone/potiah/tree/main/playground/?file=src%2Fpages%2FHomeRoute.vue&title=Potiah%20Playground)

_Potiah_ (pronounced `/pot'jʌɦ/`, means _train_ in Ukrainian) is a thin [Vue.js](https://vuejs.org) wrapper for
precious [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) 🚂.

> _"It utilizes native `Vue` features such as components and composables to give maximum control over `LocomotiveScroll`
> API to developer and make it easier to integrate it into a `Vue` app."_
>
> &ndash; ChatGPT

* [Documentation 📖](https://potiah.somespecial.one)

* [Online playground ✨](https://stackblitz.com/github/somespecialone/potiah/tree/main/playground/?file=src%2Fpages%2FHomeRoute.vue&title=Potiah%20Playground)

---

⚠️ The project is unstable and depends
on [Locomotive Scroll v5 beta](https://github.com/locomotivemtl/locomotive-scroll/tree/v5-beta).
So there might be some breaking changes in the future unless stable (first major) version is released. Best regards!

---

## Installation

### Bundler / package manager

```sh
npm install potiah
```

```sh
pnpm add potiah
```

```sh
yarn add potiah
```

### Direct Download / CDN

Specified version

```html
<script src="https://unpkg.com/potiah@1.0.0-alpha.1"></script>
```

Latest

```html
<script src="https://unpkg.com/potiah"></script>
```

❗ Also note, that you need to load [lenis styles](https://github.com/studio-freight/lenis#considerations) from CDN too

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@beta/bundled/locomotive-scroll.css">
```

## Basic usage

### Setup plugin

```js
import 'locomotive-scroll/locomotive-scroll.css' // if you install trough package manager  
import { createPotiah } from 'potiah'

import App from './App.vue'

const app = createApp(App)

app.use(createPotiah())
app.mount('#app')
```

### Create view

```vue
<script setup lang="ts">
import { ScrollView } from 'potiah'
</script>

<template>
  <ScrollView root :duration="1.7">
    <!-- your components/content-->
  </ScrollView>
</template>
```

### Place scroll components

```vue
<script setup lang="ts">
import { ScrollView, ScrollComponent } from 'potiah'
</script>

<template>
  <ScrollView root :duration="1.7">
    <ScrollComponent class="first-scroll-component" :speed="0.2" css-progress>
      <!-- your components/content-->
    </ScrollComponent>
    <!-- your components -->
  </ScrollView>
</template>
```

### Use composable

```vue
<script setup lang="ts">
import { usePotiah } from 'potiah'

const { scrollTo } = usePotiah()

// example
function handleClickOnSomeElement({target}) {
  scrollTo(target)
}
</script>
```

## Core

* `Potiah` - 🚂.
* `<ScrollView />` - wrapper for scrollable scene. It can be whole document or any container element inside the DOM.
* `<ScrollComponent />` - `scroll element` within scroll scene. It gathers all `data-*`
  attributes from [Locomotive Scroll element](https://scroll.locomotive.ca/docs/#/attributes).
* `usePotiah` - composable that returns current `Potiah` instance, `scrollTo` function, refs with scroll data.

> For more information please visit [Documentation 📖](https://potiah.somespecial.one)

## Credits:
* [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll)
* [Lenis](https://github.com/studio-freight/lenis)
* Train from logo - [Aslan Almukhambetov](https://dribbble.com/reggid) CC Attribution License via [SVG Repo](https://www.svgrepo.com/)
