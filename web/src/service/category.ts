import {createMutation, createQuery} from '@tanstack/solid-query'
import {app} from './client'
import {queryClient} from '../App'

export const createCategoryQuery = () => {
  return createQuery(() => ({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await app.category[''].get({$query: {}})
      if (res.error) throw res.error
      return res.data
    },
  }))
}

export const createCategoryMutation = () => {
  return createMutation(() => ({
    mutationFn: async () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['categories']})
    },
  }))
}
