<template>
    <header class="bg-blue-200 text-white flex items-center p-4">
      <button @click="toggleMenu" v-if="!menuVisible" class="md:hidden mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 261.76 226.69">
        <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883" />
        <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e" />
      </svg>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const menuVisible = ref(false)
  const toggleMenu = () => {
    menuVisible.value = !menuVisible.value
  }
  </script>
  