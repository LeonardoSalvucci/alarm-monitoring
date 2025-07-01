import { defineStore } from "pinia";
import { piniaPluginPersistedstate } from "#imports";
import type { LoginResponse } from "@alarm-monitoring/schemas/auth";
import type { User } from "@alarm-monitoring/schemas/user";

export const useUserStore = defineStore("user", 
  () => {
    const accessToken = useState<string | null>(() => null);
    const user = ref<User | null>(null);

    const isAuthenticated = computed(() => !!accessToken.value);
    
    const login = async ({email, password}: {email: string, password: string }) => {
      // Here you would typically call your backend API
      try {
        // this call should not use useApi as the header is not set
        const response = await $fetch<LoginResponse>(`api/auth/login`, {
          method: 'POST',
          body: {
            email,
            password
          }
        })

        // Handle successful login
        if (response.accessToken) {
          setLoggedInUser(response.accessToken);
          await loadUserData();
        } else {
          throw new Error('Login failed');
        }
        } catch (error: unknown) {
          const errorMsg = error instanceof Error ? error.message : 'Login failed. Please try again.';
          throw new Error(errorMsg);
        }
    };

    const loadUserData = async () => {
      if (accessToken.value && !user.value?.name) {
        user.value = await $fetch<User>('/api/user/me', { headers: { Authorization: `Bearer ${accessToken.value}` } });
      }
    }

    const logout = async () => {
      try {
        // Call your backend API to log out
        await useApiFetch('/api/auth/logout', {
          method: 'POST',
        });
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        reset();
      }
    }
    
    const setLoggedInUser = (token: string) => {
      accessToken.value = token;
    };

    const reset = () => {
      accessToken.value = null;
      user.value = null;
    }

    return {
      isAuthenticated,
      accessToken,
      user,
      loadUserData,
      logout,
      login,
      reset,
    }
  },
  {
    persist: [
      {
        storage: piniaPluginPersistedstate.cookies({
          sameSite: 'strict',
        }),
        omit: ['user']
      }
    ],
  },
)