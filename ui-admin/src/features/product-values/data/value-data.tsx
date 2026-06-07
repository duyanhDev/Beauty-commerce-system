import { api } from '@/lib/axios'
import { ProductValue } from './schema'

export const fetchProductValue = async () => {
  try {
    const res = await api.get('/product-attributes')

    if (res && res.data && res.data.EC === 0) {
      return res.data.data as ProductValue[]
    }
  } catch (error: any) {
    throw new Error(`Lỗi gọi api product-attributes, ${error}`)
  }
}
