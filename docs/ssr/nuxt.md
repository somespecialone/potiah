# Nuxt.js

For the current moment project does not have special module or specified integration with [Nuxt.js](https://nuxt.com).

**But that doesn't mean that it doesn't work with it!**

To adapt it create plugin for `NuxtApp`, for example `scroll.ts` and there create `Potiah`:

::: code-group

```js [plugins/scroll.ts]
import { createPotiah } from 'potiah'

export default defineNuxtPlugin({
  name: 'potiah',
  setup({ vueApp }) {
    vueApp.use(createPotiah())
  }
})
```
:::

That's all you need to make things work. Now you can use library as usual!
