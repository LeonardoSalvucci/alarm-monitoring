import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';
export const useApi = () => {
  const { accessToken } = useUserStore();

  const fetch = async <
    DefaultT = unknown,
    DefaultR extends NitroFetchRequest = NitroFetchRequest,
    T = DefaultT,
    R extends NitroFetchRequest = DefaultR,
    O extends NitroFetchOptions<R> = NitroFetchOptions<R>
  >(url: R, options: O): Promise<T> => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    return $fetch<T>(url, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
    });
  }

  return {
    fetch,
  }
}