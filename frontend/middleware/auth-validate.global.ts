const bypassRoutes = [
  '/login',
]
export default defineNuxtRouteMiddleware(async (to) => {
  if (bypassRoutes.includes(to.path)) {
    return
  }
  const userStore = useUserStore()
  if (!userStore.isAuthenticated) {
    // Redirect to login page if not authenticated
    userStore.reset() // Reset user store to clear any stale data
    return navigateTo({
      path: '/login',
      query: {
        redirect: to.fullPath, // Store the original path to redirect after login
      },
    })
  } 
})