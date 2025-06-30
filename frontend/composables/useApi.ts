import { omitBy } from 'lodash-es';
import type {UseFetchOptions} from 'nuxt/app';

export const useApiFetch = async <T>(url: string, options: UseFetchOptions<T> = {}) =>
  await useFetch<T>(url, 
    omitBy(
      {
      $fetch: useNuxtApp().$api,
      ...options,
      },
      (value) => value === undefined || value === null
    )
);