<template>
  <div class="min-h-screen flex flex-col">
    <Nav />
    <div class="flex flex-1">
      <Sidebar />
      <main class="flex-1 p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from './components/Nav.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<style scoped>
body {
  @apply bg-gray-100;
}
</style>
