<script setup lang="ts">
// TODO make some more feature presentable and clean this

import { onMounted, ref, watch } from 'vue'

import { usePotiah, ScrollView, ScrollComponent } from 'potiah'

const flag = ref(true)
const duration = ref(1.4)

const { scrollTo, potiah, direction, isScrolling } = usePotiah()

const zero = ref<InstanceType<typeof ScrollComponent> | null>(null)
const zero1 = ref<InstanceType<typeof ScrollComponent> | null>(null)
const blank = ref<HTMLElement>()

onMounted(() => {
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement
    if (t.tagName === 'A' && t.getAttribute('href').startsWith('#')) {
      scrollTo(t.getAttribute('href'))
    }
  })
})

watch(
  () => zero.value?.scrollElement,
  () => {
    // component is ready there
  }
)

function handleMounted() {}

function handleInsersect(d) {}
</script>

<template>
  <ScrollView :duration="duration" css-direction root>
    <header>
      <a href="#top">top</a>
      <a href="#zero1">zero1</a>
      <a href="#second">second</a>
      <a href="#blank">blank</a>
    </header>
    <ScrollComponent @vue:mounted="handleMounted" id="top" is="section" class="zero" ref="zero">
      Scroll comp text!!!
    </ScrollComponent>
    <ScrollComponent id="zero1" :class="{ flag }" :speed="0.2" is="section" class="zero1" ref="zero1">
      Scroll !!1
    </ScrollComponent>
    <div class="first" @click="scrollTo(blank)">Main div</div>
    <div id="second" class="second" data-scroll data-scroll-speed="0.2" :data-flag="flag">Child el!!!</div>
    <div class="third" @click="$scrollTo(zero.el)">Main third div</div>
    <div id="blank" class="blank" ref="blank" @click="scrollTo(zero.el)"></div>
    <ScrollComponent
      in-view-class="test-in-view-class"
      repeat
      :style="{ height: '25vh', background: 'blue' }"
      @intersect="handleInsersect"
    />
  </ScrollView>
</template>

<style>
header {
  position: fixed;
  top: 0;
  z-index: 99;

  width: 100%;

  display: flex;
  justify-content: center;
  gap: 1em;
}

.zero {
  height: 30vh;
  background-color: coral;
}

.zero1 {
  height: 25vh;
  background-color: lightpink;
}

.zero1.flag {
  display: none;
}

.first {
  height: 35vh;
  background-color: antiquewhite;
}

.second {
  height: 15vh;
  background-color: cadetblue;
}

.second[data-flag='true'] {
  background-color: red;
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
