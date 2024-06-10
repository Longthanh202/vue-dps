<template>
    <nav :class="['bg-gray-800 text-white p-4', { 'block': menuVisible, 'hidden': !menuVisible, 'md:block': true }]" class="w-64">
      <div class="flex justify-between items-center mb-4">
        <button @click="toggleMenu" class="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ul>
        <li class="mb-2">
          <RouterLink to="/" class="flex items-center p-2 hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10v10h18V10L12 3 3 10z" />
            </svg>
            Home
          </RouterLink>
        </li>
        <li class="mb-2">
          <RouterLink to="/about" class="flex items-center p-2 hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            About
          </RouterLink>
        </li>
        <li class="mb-2">
          <RouterLink to="/post" class="flex items-center p-2 hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16m-7 6h7" />
            </svg>
            Post
          </RouterLink>
        </li>
        <li class="mb-2">
          <RouterLink to="/user" class="flex items-center p-2 hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 18.364A4 4 0 115.121 9.88M5.12 18.364A4 4 0 109.88 5.121M18.364 5.121A4 4 0 119.88 5.12M18.364 5.121a4 4 0 10-4.243 4.243" />
            </svg>
            User
          </RouterLink>
        </li>
        <li class="mb-2">
          <RouterLink to="/students" class="flex items-center p-2 hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 18.364A4 4 0 115.121 9.88M5.12 18.364A4 4 0 109.88 5.121M18.364 5.121A4 4 0 119.88 5.12M18.364 5.121a4 4 0 10-4.243 4.243" />
            </svg>
            Students
          </RouterLink>
        </li>
        <li class="mb-2">
          <RouterLink to="/css" class="flex items-center p-2 hover:bg-gray-700 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 18.364A4 4 0 115.121 9.88M5.12 18.364A4 4 0 109.88 5.121M18.364 5.121A4 4 0 119.88 5.12M18.364 5.121a4 4 0 10-4.243 4.243" />
            </svg>
            Css
          </RouterLink>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const menuVisible = ref(false)
  const toggleMenu = () => {
    menuVisible.value = !menuVisible.value
  }
  </script>
  