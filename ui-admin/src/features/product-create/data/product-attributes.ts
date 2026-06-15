import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export type ProductAttribute = {
  id: number
  name: string
  description?: string
  values: ProductAttributeValue
}

export type ProductAttributeValue = {
  id: number
  value: string
}

export type ProductAttributeWithValues = ProductAttribute & {
  values: ProductAttributeValue[]
}

const fetchAttributes = async (): Promise<ProductAttribute[]> => {
  const res = await api.get('/product-attributes')
  if (res?.data?.EC === 0) return res.data.data as ProductAttribute[]
  throw new Error(res?.data?.message ?? 'Lỗi gọi api product-attributes')
}

export const useProductAttributes = () =>
  useQuery<ProductAttribute[]>({
    queryKey: ['product-attributes'],
    queryFn: fetchAttributes,
  })
