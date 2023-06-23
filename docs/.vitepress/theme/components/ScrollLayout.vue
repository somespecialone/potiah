<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { ScrollView, ScrollComponent, useVuecomotiveScroll } from 'vuecomotive-scroll'

import HomeLogo from './HomeLogo.vue'
import MouseIco from './MouseIco.vue'
import ArrowIco from './ArrowIco.vue'

const { Layout } = DefaultTheme

const { scroll } = useVuecomotiveScroll()

const route = useRoute()

const isHome = computed(() => route.path == '/')
const active = ref(false)
const visited = ref(false)
watch(route, () => {
  visited.value = true
  active.value = true
})

function handleScroll({ progress }) {
  document.documentElement.style.setProperty('--wrapper-progress', progress.toString())
  if (progress >= 0.95 && !active.value) {
    active.value = true
  } else if (progress < 0.95 && active.value) {
    active.value = false
  }
}
</script>

<template>
  <ScrollView v-if="isHome" :duration="1.7" root>
    <Layout class="home" :class="{ active }">
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
    bottom: 0;
    right: 1em;

    color: var(--vp-c-text-2);
    font-size: 10px;
    font-weight: 500;

    transform: translateY(100%);
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

    .VPNavBar.fill {
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
            var(--vp-c-brand) calc(((1 - var(--wrapper-progress)) * -200%) + 20%),
            var(--vp-c-green-light)
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

        .vuecomotive-svg {
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
    .blank .scroll-down .arrow {
      animation: none;
    }

    .copyright {
      transform: translateY(0);
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
