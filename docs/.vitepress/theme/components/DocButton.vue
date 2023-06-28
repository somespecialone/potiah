<template>
  <button class="doc-button .DocSearch">
    <slot />
  </button>
</template>

<style lang="scss">
.doc-button {
  padding: 6px 20px;

  border-radius: 8px;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);

  color: var(--vp-c-text-2);

  transition: border-color 0.25s, color 0.25s;

  &:hover {
    color: var(--vp-c-brand);
    border-color: var(--vp-c-text-1);
  }
}
</style>
