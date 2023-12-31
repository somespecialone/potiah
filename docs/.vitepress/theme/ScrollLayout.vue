<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect, provide, nextTick } from 'vue'
import { useRoute, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import type Lenis from '@studio-freight/lenis'

import { ScrollView, ScrollComponent, usePotiah } from 'potiah'

import HomeLogo from './components/HomeLogo.vue'
import MouseIco from './components/MouseIco.vue'
import ArrowIco from './components/ArrowIco.vue'

import { DEF_DUR, PROGRESS_THRESHOLD } from '../constants'

const { Layout } = DefaultTheme

const { potiah } = usePotiah()

const route = useRoute()
const { isDark, frontmatter } = useData()

const frontScroll = computed<boolean>(() => frontmatter.value.scroll)
const home = computed(() => route.path == '/')
const duration = ref(DEF_DUR)
const durationComp = computed(() => (home.value ? 2 : duration.value))
const active = ref(false)
const visited = ref(false)
watch(route, () => {
  visited.value = true
  active.value = true
  immediate = true
  duration.value = DEF_DUR
})

// mock `window.scrollTo` function with ours `scrollTo` to handle scroll from router by ourselves
let windowScrollTo
let immediate = true // immediate initial scroll

function handleScrollTo(o: ScrollToOptions | number, top?: number) {
  potiah.scrollTo(typeof o === 'number' ? top : o.top, { immediate })
  immediate = false
}

watchEffect(() => {
  if (!import.meta.env.SSR) {
    // because it will be called during build somehow
    !windowScrollTo && (windowScrollTo = window.scrollTo)
    window.scrollTo = frontScroll.value ? handleScrollTo : windowScrollTo
  }
})

function handleScroll({ progress }) {
  document.documentElement.style.setProperty('--wrapper-progress', progress.toString())
  if (progress >= PROGRESS_THRESHOLD && !active.value) {
    active.value = true
  } else if (progress < PROGRESS_THRESHOLD && active.value) {
    active.value = false
  }
}

onMounted(() => {
  !location.hash && (immediate = false)
})

onBeforeUnmount(() => windowScrollTo && (window.scrollTo = windowScrollTo))

provide('duration', duration)

// animate dark <> light mode switch
// https://github.com/vite-pwa/docs/blob/8917eccda8c13c29cd151ae91a0e398e3394eb91/.vitepress/theme/PwaLayout.vue
function enableTransitions() {
  return 'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})

// TODO this is obviously a bad idea.
//  Consider global option like router's `onRouteChange` to have access to event in child components
//  and can change values of DOM in non-reactive manner
const vel = ref('0')
provide('velocity', vel)
function handleLenisScroll({ velocity }: Lenis) {
  vel.value = velocity.toFixed(2)
}
</script>

<template>
  <ScrollView v-if="frontScroll" :duration="durationComp" root smooth-touch @lenis-scroll="handleLenisScroll">
    <Layout v-if="home" :class="{ active, home }">
      <template #layout-top>
        <ScrollComponent v-if="!visited" class="blank" @progress="handleScroll">
          <div class="scroll-down">
            <MouseIco />
            <ArrowIco class="arrow" />
          </div>
        </ScrollComponent>
        <div class="copyright">© 2023 Dmytro Tkachenko. Released under the MIT License.</div>
      </template>
      <template #home-hero-image>
        <HomeLogo class="image-src" />
      </template>
    </Layout>
    <Layout v-else />
  </ScrollView>
  <Layout v-else />
</template>

<style lang="scss">
// styles only for home page
.Layout.home {
  overflow: hidden;

  .blank {
    height: 100vh;

    .scroll-down {
      position: fixed;
      z-index: -2;
      bottom: 1em;
      left: 50%;

      width: 3.5em;

      transform: translateX(-50%);

      svg {
        width: 100%;
      }

      .arrow {
        rotate: 180deg;

        animation: float 1s infinite alternate ease-in-out;
      }
    }
  }

  .copyright {
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 50%;

    color: var(--vp-c-text-2);
    font-size: 0.9vw;
    font-weight: 500;
    white-space: nowrap;

    transform: translate(-50%, 100%);
    transition: transform 0.5s ease-out;
  }

  .VPNav {
    transform: translateY(-100%);
    transition: transform 0.5s ease-out;

    .content-body {
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
      background-color: transparent !important;
    }

    .VPNavBar {
      background-color: transparent;
      border-bottom: none;
    }
  }

  #VPContent {
    min-height: 100vh;

    .VPHome {
      padding-bottom: 20px !important;

      .VPHomeHero {
        transform: translateY(calc((1 - var(--wrapper-progress)) * (-100vh + 10%)));

        .name .clip {
          background: linear-gradient(
            120deg,
            var(--vp-c-brand-1) calc(((1 - var(--wrapper-progress)) * -200%) + 20%),
            var(--vp-c-green-1)
          );
          background-clip: text;
          -webkit-background-clip: text;
        }

        .main .tagline {
          opacity: var(--wrapper-progress);
        }

        .actions {
          transition: opacity 0.5s linear;
          opacity: 0;
          pointer-events: none;
        }

        .potiah-svg {
          overflow: unset;

          #logo-vue {
            transform: translateY(calc((1 - var(--wrapper-progress)) * -45%));
          }

          #logo-train,
          #logo-rails {
            transform: translateY(calc((1 - var(--wrapper-progress)) * +60%));
          }

          #logo-lights {
            opacity: var(--wrapper-progress);
          }
        }

        .image-bg {
          z-index: -1;

          background-repeat: no-repeat;
          background-position: center;
          background-size: calc(var(--wrapper-progress) * 100%);
        }
      }

      .VPHomeFeatures {
        transform: translateY(calc((1 - var(--wrapper-progress)) * -200%));

        &:after {
          content: '';

          position: absolute;
          z-index: -1;
          left: 50%;
          top: 8px;

          width: 5em;
          height: 50vh;

          background-color: var(--vp-c-bg);

          transform: translateX(-50%);
        }
      }
    }
  }

  &.active {
    .blank .scroll-down {
      display: none;
    }

    .copyright {
      transform: translate(-50%, 0);
    }

    .VPNav {
      transform: translateY(0);
    }

    #VPContent .VPHome {
      .actions {
        opacity: 1;
        pointer-events: auto;
      }

      #logo-lights {
        animation: blink 0.2s 3 linear;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .Layout.home {
    .VPNav {
      position: fixed;

      background-color: var(--vp-c-bg);
      border-bottom: 1px var(--vp-c-gutter) solid;
    }

    #VPContent .VPHome {
      .main {
        transform: translateY(calc((1 - var(--wrapper-progress)) * 48px));
      }

      .VPHomeFeatures {
        transform: none;

        &:after {
          height: 100%;
        }
      }
    }
  }
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  from {
    transform: translateY(-10%);
  }
  to {
    transform: translateY(10%);
  }
}
</style>
