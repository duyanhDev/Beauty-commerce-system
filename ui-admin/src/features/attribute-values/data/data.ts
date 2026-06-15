import { api } from '@/lib/axios'

export const fetchDataProductAttribute = async () => {
  try {
    const res = await api.get('/product-attributes')

    if (res && res.data && res.data.EC === 0) {
      return res.data.data as []
    }
  } catch (error: any) {
    throw new Error(`Lỗi gọi api ${error}`)
  }
}

export const fetchDataAttributeValue = async () => {
  try {
    const res = await api.get('/attribute-values')

    if (res && res.data && res.data.EC === 0) {
      return res.data.data as []
    }
  } catch (error: any) {
    throw new Error(`Lỗi gọi api ${error}`)
  }
}
