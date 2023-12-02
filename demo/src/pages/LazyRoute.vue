<script setup lang="ts">
import { useScroll, ScrollView, ScrollComponent } from 'potiah'
</script>

<template>
  <ScrollView class="lazy-route" horizontal css-progress>
    <ScrollComponent class="scroll-el-1">Scroll element #1</ScrollComponent>
    <ScrollComponent class="scroll-el-2" :speed="-0.5">Scroll element #2</ScrollComponent>
    <ScrollComponent class="scroll-el-3">Scroll element #3</ScrollComponent>
  </ScrollView>
</template>

<style>
.lazy-route {
  height: 100vh;
  overflow: hidden;
}

.lazy-route > div {
  width: fit-content;
  height: 100%;
  display: flex;
}

.scroll-el-1 {
  width: 20vw;
  height: 100%;
  background: rebeccapurple;
}

.scroll-el-2 {
  width: 70vw;
  height: 100%;
  background: aquamarine;
}

.scroll-el-3 {
  width: 40vw;
  height: 100%;
  background: darkorange;
}
</style>
