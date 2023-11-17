<script setup lang="ts">
//
</script>

<template>
  <main>
    <div class="nav-bar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/lazy">Lazy</RouterLink>
    </div>
    <RouterView />
  </main>
</template>

<style>
body {
  padding: 0;
  box-sizing: border-box;
  margin: 0;
  background-color: mediumpurple;
}

.nav-bar {
  position: fixed;
  z-index: 100;
  right: 0;

  display: flex;
  gap: 1rem;
  padding: 0 1rem;

  background: cadetblue;
}
</style>
