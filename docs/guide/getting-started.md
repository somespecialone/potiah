# Getting started

## Installation

### Prerequisites

* [Vue](https://vuejs.org/) version 3.3.0 or higher.

Install with:

::: code-group

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

## Create scroll instance

Before starting you need to import [lenis styles](https://github.com/studio-freight/lenis#considerations) in your code:

```js
import 'vuecomotive-scroll/dist/lenis.css'
```

Create a scroll instance and pass it to the app as a plugin:

```js
import { createApp } from 'vue'

import 'vuecomotive-scroll/dist/lenis.css'
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

## What is scroll?

A scroll is an instance
of [LocomotiveScroll](https://github.com/somespecialone/vuecomotive-scroll/blob/master/lib/src/scroll.ts) class.

## Dependencies

* [Locomotive Scroll v5](https://github.com/locomotivemtl/locomotive-scroll)
