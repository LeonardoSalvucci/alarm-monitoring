<template>
  <header class="absolute top-0 left-0 w-full flex items-center py-3 bg-white shadow-md  justify-between  px-4 sm:px-6 lg:px-8">
    <div class="flex items-center gap-4">
      <h1 class="text-xl font-bold">Alarm Monitoring</h1>
      <div> - </div>
      <h3 class=" text-gray-600">
        {{ `${user?.name} (${user?.role})` || 'Guest' }}
      </h3>
    </div>
    <div class="flex items-center">
      <button
        class="cursor-pointer transition scale-none hover:scale-110 hover:text-red-500"
        @click="handleLogout"
      >
        <svg
          width="24px"
          height="24px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
        ><path
          d="M12 12H19M19 12L16 15M19 12L16 9"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        /><path
          d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        /></svg>
      </button>
    </div>
  </header>
</template>
<script setup lang="ts">
const userStore = useUserStore()
const { logout } = userStore
const { user } = storeToRefs(userStore)

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