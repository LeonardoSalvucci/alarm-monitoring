export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    async onRequest({options}) {
      await useNuxtApp().runWithContext(() => {
        const userStore = useUserStore();
        const { accessToken } = storeToRefs(userStore);

        options.headers = new Headers(options.headers || {});
        // Set the Authorization header if the user is authenticated
        if (accessToken.value) {
          options.headers.set('Authorization', `Bearer ${accessToken.value}`);
        }
      });
    },
    async onResponseError({response}) {
      // Handle specific error codes
      if (response.status === 401) {
        // Unauthorized, redirect to login or show an error
        const userStore = useUserStore();
        userStore.reset();
        navigateTo('/login');
      } 
    }
  });

  return {
    provide: {
      api
    }
  }
});