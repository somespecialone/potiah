# Creating scroll view

The `ScrollView` and `ScrollComponent` components are registered and available globally, but if your IDE complains about
typing props, you can import them.

```vue

<script setup lang="ts">
import { ScrollView, ScrollComponent } from 'vuecomotive-scroll'

</script>

<template>
  <ScrollView root>
    <ScrollComponent />
  </ScrollView>
</template>

```

:::warning Single scroll instance
There is single available instance of scroll for each app. So, if You mount several `ScrollView` components at once, the
latter will work and previous not.
:::
