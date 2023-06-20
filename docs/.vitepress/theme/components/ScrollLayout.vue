<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import { ScrollView, ScrollComponent, useVuecomotiveScroll } from 'vuecomotive-scroll'

import HomeLogo from './HomeLogo.vue'

const { Layout } = DefaultTheme

const { scroll } = useVuecomotiveScroll()

const route = useRoute()

const scrollView = ref<InstanceType<typeof ScrollView> | null>(null)
const isHome = computed(() => route.path == '/')
const active = ref(false)
const visited = ref(false)
watch(route, () => (visited.value = true))

// optimization
let VPNavBar: HTMLElement
let VPHeroBar: HTMLElement

onMounted(() => {
  VPNavBar = document.getElementsByClassName('VPNavBar')[0] as HTMLElement
  VPHeroBar = document.getElementsByClassName('VPHomeHero')[0] as HTMLElement
})

function handleScroll({ progress }) {
  const wrapper: HTMLElement = scrollView.value!.wrapper
  wrapper.style.setProperty('--blank-progress', progress.toString())
  if (progress >= 0.95 && !active.value) {
    VPNavBar.classList.add('fill')
    active.value = true
  } else if (progress < 0.95 && active.value) {
    VPNavBar.classList.remove('fill')
    active.value = false
  }
}

// TODO scroll down
</script>

<template>
  <ScrollView v-if="isHome" :class="{ active }" ref="scrollView" wrapper-is="div" :duration="1.7">
    <Layout>
      <template #layout-top>
        <ScrollComponent v-if="!visited" class="blank" event-progress @progress="handleScroll"></ScrollComponent>
      </template>
      <template #home-hero-image>
        <HomeLogo class="image-src" />
      </template>
    </Layout>
  </ScrollView>
  <Layout v-else />
</template>

<style lang="scss">
.vuecomotive-scroll-wrapper {
  height: 100vh;
  overflow-y: hidden;

  .blank {
    height: 100vh;
  }

  .VPNav {
    transform: translateY(calc((1 - var(--blank-progress)) * -100%));
  }

  .VPHome {
    height: calc(100vh - 5rem);

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
      transform: translateY(calc((1 - var(--blank-progress)) * -300%));
    }
  }

  .VPFooter {
    height: 5rem;

    padding: 0 !important;
    display: flex;
    align-items: center;
  }

  &.active .VPHome {
    .actions {
      opacity: 1;
      pointer-events: auto;
    }

    #logo-lights {
      animation: blink 0.2s 3 linear;
    }
  }

  @media screen and (max-width: 960px) {
    & {
      .VPNav {
        transform: translateY(calc((1 - var(--blank-progress)) * (-100vh - 100%)));
      }

      .VPHome {
        height: unset;
        min-height: calc(100vh - 5rem);

        .main {
          transform: translateY(calc((1 - var(--blank-progress)) * 48px));
        }

        .VPHomeFeatures {
          transform: none;
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
