import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

// data/product-attributes.ts — thêm hook fake này

export const useProductAttributesWithValues = () => {
  return {
    data: [
      {
        id: 1,
        name: 'Dung tích',
        values: [
          { id: 1, value: '236ml' },
          { id: 2, value: '473ml' },
          { id: 3, value: '100ml' },
          { id: 4, value: '50ml' },
        ],
      },
      {
        id: 2,
        name: 'Loại da',
        values: [
          { id: 5, value: 'Da dầu' },
          { id: 6, value: 'Da khô' },
          { id: 7, value: 'Da hỗn hợp' },
          { id: 8, value: 'Da nhạy cảm' },
        ],
      },
      {
        id: 3,
        name: 'Màu sắc',
        values: [
          { id: 9, value: 'Đỏ' },
          { id: 10, value: 'Hồng' },
          { id: 11, value: 'Nude' },
          { id: 12, value: 'Cam' },
        ],
      },
      {
        id: 4,
        name: 'Size',
        values: [
          { id: 13, value: 'S' },
          { id: 14, value: 'M' },
          { id: 15, value: 'L' },
          { id: 16, value: 'XL' },
        ],
      },
    ],
    isLoading: false,
    isError: false,
  }
}

/** Row trong bảng product_attributes (id, name, description) */
export type ProductAttribute = {
  id: number
  name: string // "color" | "volume" | "skin_type" | ...
  description?: string
}

/** Row trong bảng product_attribute_values (mỗi attribute có nhiều values) */
export type ProductAttributeValue = {
  id: number
  value: string // "Đỏ", "500ml", "Da dầu", ...
  attribute_id: number
}

/** Attribute kèm danh sách values — dùng trong ProductCreate */
export type ProductAttributeWithValues = ProductAttribute & {
  values: ProductAttributeValue[]
}

/** Lấy danh sách attributes (không kèm values) */
const fetchAttributes = async (): Promise<ProductAttribute[]> => {
  const res = await api.get('/product-attributes')
  if (res?.data?.EC === 0) return res.data.data as ProductAttribute[]
  throw new Error(res?.data?.message ?? 'Lỗi gọi api product-attributes')
}

/** Lấy danh sách values của một attribute */
const fetchAttributeValues = async (
  attributeId: number
): Promise<ProductAttributeValue[]> => {
  const res = await api.get(`/product-attributes/${attributeId}/values`)
  if (res?.data?.EC === 0) return res.data.data as ProductAttributeValue[]
  throw new Error(res?.data?.message ?? 'Lỗi gọi api attribute-values')
}

/** Lấy tất cả attributes kèm values (dùng cho form tạo/sửa sản phẩm) */
const fetchAttributesWithValues = async (): Promise<
  ProductAttributeWithValues[]
> => {
  const attrs = await fetchAttributes()

  const results = await Promise.all(
    attrs.map(async (attr) => {
      const values = await fetchAttributeValues(attr.id)
      return { ...attr, values }
    })
  )

  return results
}

// ── Hooks ──────────────────────────────────────────────────────────────────

/** Hook lấy attributes (không kèm values) */
export const useProductAttributes = () =>
  useQuery<ProductAttribute[]>({
    queryKey: ['product-attributes'],
    queryFn: fetchAttributes,
  })

/** Hook lấy attributes kèm values — dùng trong ProductCreate */
// export const useProductAttributesWithValues = () =>
//   useQuery<ProductAttributeWithValues[]>({
//     queryKey: ['product-attributes-with-values'],
//     queryFn: fetchAttributesWithValues,
//   })
