<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { ScrollView, ScrollComponent, useVuecomotiveScroll } from 'vuecomotive-scroll'

import HomeLogo from './HomeLogo.vue'
import MouseIco from './MouseIco.vue'

const { Layout } = DefaultTheme

const { scroll } = useVuecomotiveScroll()

const route = useRoute()

const scrollView = ref<InstanceType<typeof ScrollView> | null>(null)
const isHome = computed(() => route.path == '/')
const active = ref(false)
const visited = ref(false)
watch(route, () => {
  visited.value = true
  scroll.destroy()
})

function handleScroll({ progress }) {
  const wrapper: HTMLElement = scrollView.value!.wrapper
  wrapper.style.setProperty('--blank-progress', progress.toString())
  if (progress >= 0.95 && !active.value) {
    active.value = true
  } else if (progress < 0.95 && active.value) {
    active.value = false
  }
}
</script>

<template>
  <ScrollView v-if="isHome" :class="{ active }" ref="scrollView" wrapper-is="div" :duration="1.7">
    <Layout>
      <template #layout-top>
        <ScrollComponent v-if="!visited" class="blank" event-progress @progress="handleScroll">
          <MouseIco class="scroll-down" />
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
.vuecomotive-scroll-wrapper {
  .vuecomotive-scroll-content {
    position: relative;
  }

  --blank-progress: 1;

  height: 100vh;
  overflow-y: hidden;

  .blank {
    height: 100vh;

    svg {
      position: fixed;
      z-index: -2;
      bottom: 1em;
      left: 50%;

      height: 3.5em;

      transform: translateX(-50%);
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
  }

  #VPContent {
    min-height: 100vh;

    .VPHome {
      padding-bottom: 20px !important;

      .VPHomeHero {
        transform: translateY(calc((1 - var(--blank-progress)) * (-100vh + 10%)));

        .name .clip {
          background: linear-gradient(
            120deg,
            var(--vp-c-brand) calc(((1 - var(--blank-progress)) * -200%) + 20%),
            var(--vp-c-green-light)
          );
          background-clip: text;
          -webkit-background-clip: text;
        }

        .main .tagline {
          opacity: var(--blank-progress);
        }

        .actions {
          transition: opacity 0.5s linear;
          opacity: 0;
          pointer-events: none;
        }

        .vuecomotive-svg {
          overflow: unset;

          #logo-vue {
            transform: translateY(calc((1 - var(--blank-progress)) * -45%));
          }

          #logo-train,
          #logo-rails {
            transform: translateY(calc((1 - var(--blank-progress)) * +60%));
          }

          #logo-lights {
            opacity: var(--blank-progress);
          }
        }

        .image-bg {
          z-index: -1;

          background-repeat: no-repeat;
          background-position: center;
          background-size: calc(var(--blank-progress) * 100%);
        }
      }

      .VPHomeFeatures {
        transform: translateY(calc((1 - var(--blank-progress)) * -200%));

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

  .VPFooter {
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 2.5em;

    padding: 0 !important;
    display: flex;
    align-items: center;

    p {
      margin: 0 !important;
      padding: 0 !important;
      font-size: 12px !important;
      line-height: 1.2em;
    }
  }

  &.active {
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

  @media screen and (max-width: 960px) {
    & {
      .VPNav {
        position: fixed;

        background-color: var(--vp-c-bg);
        border-bottom: 1px var(--vp-c-gutter) solid;
      }

      #VPContent .VPHome {
        .main {
          transform: translateY(calc((1 - var(--blank-progress)) * 48px));
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
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
