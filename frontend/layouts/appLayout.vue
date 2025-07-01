<template>
  <NuxtLayout name="default" class="h-full">
    <AppHeader />
    <main class="flex-1 flex flex-col">
      <div class="container mx-auto px-4 py-6">
        <slot />
      </div>
    </main>
    <AppFooter />
  </NuxtLayout>
</template>
<script setup lang="ts">

const userStore = useUserStore();
const { loadUserData } = userStore;
const { accessToken } = storeToRefs(userStore);
useLazyAsyncData('user', async () => {
  if (accessToken.value) {
    await loadUserData();
    return userStore.user;
  }
}, {
  watch: [accessToken],
});
</script>