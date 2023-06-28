<p align="center">
  <a href="https://vuecomotive.somespecial.one" target="_blank" rel="noopener noreferrer">
    <img width="240" src="https://raw.githubusercontent.com/somespecialone/vuecomotive-scroll/master/docs/public/logo.svg" alt="Vuecomotive logo">
  </a>
  <h1 align="center">Vuecomotive Scroll</h1>
</p>

[![Made in Ukraine](https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7)](https://stand-with-ukraine.pp.ua)
[![license](https://img.shields.io/github/license/somespecialone/vuecomotive-scroll)](https://github.com/somespecialone/vuecomotive-scroll/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

Vuecomotive Scroll is a thin [Vue.js](https://vuejs.org) wrapper for
precious [Locomotive Scroll v5](https://github.com/locomotivemtl/locomotive-scroll) 🚂.

It utilizes native `Vue` features like components and composables to give max control of `Locomotive Scroll` API to
developer and make easier to integrate it in `Vue` app.

[Documentation 📖](https://vuecomotive.somespecial.one)

---

⚠️ Project is `unstable` and depends
on [Locomotive Scroll v5 beta](https://github.com/locomotivemtl/locomotive-scroll/tree/v5-beta). So there maybe some
breaking changes in future unless stable (first major) version/release. Kind regards!

---

## Installation

### Bundler / package manager

```sh
npm install vuecomotive-scroll
```

```sh
pnpm add vuecomotive-scroll
```

```sh
yarn add vuecomotive-scroll
```

### Direct Download / CDN

Specified version

```html
<script src="https://unpkg.com/vuecomotive-scroll@0.1.0"></script>
```

Latest

```html
<script src="https://unpkg.com/vuecomotive-scroll"></script>
```

Also note, that you need to load [lenis styles](https://github.com/studio-freight/lenis#considerations) from CDN too

```html
<link rel="stylesheet" href="https://unpkg.com/vuecomotive-scroll/dist/lenis.css">
```

## Basic usage

### Setup plugin

```js
import { createApp } from 'vue'

import 'vuecomotive-scroll/dist/lenis.css' // if you install trough package manager  
import createVuecomotiveScroll from 'vuecomotive-scroll'

import App from './App.vue'

const app = createApp(App)
const scroll = createVuecomotiveScroll()

app.use(scroll)
app.mount('#app')
```

### Create view

```vue
<template>
  <ScrollView root :duration="1.7">
    <!-- your components/content-->
  </ScrollView>
</template>
```

### Place scroll components

```vue
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
<script lang="ts">
import { useScroll } from 'vuecomotive-scroll'

const { scrollTo } = useScroll()

// example
function handleClickOnSomeElement({target}) {
  scrollTo(target)
}
</script>
```

## Core

* `scroll` - 🚂.
* `<ScrollView />` - wrapper for scrollable scene. It can be whole document or some container
  element inside DOM.
* `<ScrollComponent />` - `scroll element` within scroll scene. It gathers all `data-*`
  attributes from [Locomotive Scroll element](https://scroll.locomotive.ca/docs/#/attributes).
* `useScroll` - composable that returns `scroll`, `scrollTo` function, refs with scroll data.

> For all details please visit [Documentation 📖](https://vuecomotive.somespecial.one)

## Licences:

* Train from logo - [Aslan Almukhambetov](https://dribbble.com/reggid) CC Attribution
  License via [SVG Repo](https://www.svgrepo.com/)
