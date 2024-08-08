<template>
    <header class="bg-white shadow">
      <div class="container flex justify-between p-4 mx-auto">
        <div class="flex items-center">
          <button @click="toggleSidebar" class="mr-4 text-blue-500 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span class="text-2xl font-bold text-blue-400">Gaskuyy</span>
        </div>
        <div class="hidden space-x-4 lg:flex">
          <router-link to="/" class="px-4 py-2 text-sm text-gray-600 rounded hover:bg-blue-400 hover:text-white">Home</router-link>
          <router-link to="/cart" class="px-4 py-2 text-sm text-gray-600 rounded hover:bg-blue-400 hover:text-white">Keranjang</router-link>
          <router-link v-if="role === 'admin'" to="/admin" class="px-4 py-2 text-sm text-gray-600 rounded hover:bg-blue-400 hover:text-white">Admin</router-link>
          <router-link to="/" class="px-4 py-2 text-sm text-gray-600 rounded hover:bg-blue-400 hover:text-white">Profil</router-link>
          <router-link to="/login" class="px-4 py-2 text-sm text-gray-600 rounded hover:bg-blue-400 hover:text-white">Logout</router-link>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        role: ''  // Assuming the role is set somewhere in the component or via a prop
      }
    },
    methods: {
      toggleSidebar() {
        this.$emit('toggle-sidebar');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  