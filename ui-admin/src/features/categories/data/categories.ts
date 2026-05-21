import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Categories, categoriesArraySchema } from './schema'

const fetchDataCategories = async (): Promise<Categories[]> => {
  try {
    const res = await api.get('/categories')

    return categoriesArraySchema.parse(res.data?.data?.data)
  } catch (error: any) {
    console.log(error)
    throw error
  }
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchDataCategories,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}
