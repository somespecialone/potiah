---
scroll: true
---

# Composable

For use inside `setup` of components only.

 ```vue

<script setup lang="ts">
import { useScroll } from "vuecomotive-scroll"

const { scrollTo, scroll, direction, isScrolling, isReady } = useScroll()

</script>
 ```
