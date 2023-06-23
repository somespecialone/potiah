<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { useVuecomotiveScroll, ScrollView, ScrollComponent } from 'vuecomotive-scroll'

const flag = ref(false)
const duration = ref(1.4)
const progress = ref(true)

const { scrollTo, scroll, direction, isScrolling, isReady } = useVuecomotiveScroll()

const zero = ref<InstanceType<typeof ScrollComponent> | null>(null)
const zero1 = ref<InstanceType<typeof ScrollComponent> | null>(null)
const blank = ref<HTMLElement>()

onMounted(() => {
  console.log(scroll.lenis.isScrolling)
})

watch(isScrolling, (s) => {
  console.log(s, scroll.lenis?.isScrolling)
})
</script>

<template>
  <ScrollView :duration="duration" root css-direction>
    <ScrollComponent is="section" class="zero" ref="zero">Scroll comp text!!!</ScrollComponent>
    <ScrollComponent is="section" class="zero1" ref="zero1">Scroll !!1</ScrollComponent>
    <div class="first" @click="scrollTo(blank)">Main div</div>
    <div class="second" data-scroll data-scroll-speed="0.2" :data-flag="flag">Child el!!!</div>
    <div class="third" @click="$scrollTo(zero.el)">Main third div</div>
    <div class="blank" ref="blank" @click="scrollTo(zero.el)"></div>
  </ScrollView>
</template>

<style lang="scss">
body {
  padding: 0;
  box-sizing: border-box;
  margin: 0;
  background-color: mediumpurple;
}

.zero {
  height: 30vh;
  background-color: coral;
}

.vuecomotive-scroll-wrapper {
  //height: 100vh;
  //overflow-y: hidden;
  color: palevioletred;
}

.first {
  height: 35vh;
  background-color: antiquewhite;
}

.second {
  height: 15vh;
  background-color: cadetblue;

  &[data-flag='true'] {
    background-color: red;
  }
}

.third {
  height: 25vh;
  background-color: black;
}

.blank {
  height: 100vh;

  background-color: aquamarine;
}
</style>
