<template>
  <div class="flex flex-col items-center justify-center">
      <h1 class="text-2xl font-bold mb-6 text-center">Welcome to Alarm Monitoring</h1>
      <p class="text-center">Main page</p>
      <button class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200" @click="handleLogout">
        Logout
      </button>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '~/stores/user'
const { logout } = useUserStore()

const handleLogout = async () => {
  try {
    await logout()
    // Redirect to login page or home page
    navigateTo('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>