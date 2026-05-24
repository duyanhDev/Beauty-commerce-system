import z from 'zod'

const imgages = z.object({
  images: z.instanceof(File),
})

export const productsSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm không được để trống'),
  description: z.string().optional(),
  category_id: z.number().min(1, 'Vui lòng chọn danh mục'),
  brand_id: z.number().min(1, 'Vui lòng chọn thương hiệu'),
  country_id: z.number().min(1, 'Vui lòng chọn quốc gia'),
  gender_id: z.number().min(1, 'Vui lòng chọn giới tính'),
  imgages: z.array(imgages).min(1, 'Cần ít nhất 1 hình ảnh'),
})

export type ProductCreate = z.infer<typeof productsSchema>
