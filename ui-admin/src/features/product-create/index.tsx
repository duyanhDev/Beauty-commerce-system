'use client'

import { useState, useCallback } from 'react'
import { z } from 'zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  Upload,
  X,
  ImagePlus,
  Package,
  ChevronRight,
  Plus,
  Trash2,
  Tag,
} from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/axios'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useCategories } from '../categories/data/categories'
import {
  ProductAttribute,
  useProductAttributes,
} from './data/product-attributes'
import { useBrands, useCountries, useGenders } from './data/product-create'

// ── Types ─────────────────────────────────────────────────────────────────────
interface ImagePreview {
  file: File
  url: string
}

interface AttributeValue {
  id: number
  value: string
}

interface AttributeGroup {
  id: number
  name: string
  values: ProductAttribute[]
}

// ── Schemas ──────────────────────────────────────────────────────────────────
const variantSchema = z.object({
  originalPrice: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().min(1, 'Nhập giá gốc')),
  stock: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().min(0, 'Nhập tồn kho')),
  discountPercent: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().min(0).max(100))
    .optional(),
  costPrice: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().min(0))
    .optional(),
  weight: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().min(0))
    .optional(),
  note: z.string().optional(),
  attributeValueIds: z.array(z.number()).optional(),
})

const productsSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm không được để trống'),
  description: z.string().optional(),
  category_id: z.number().min(1, 'Vui lòng chọn danh mục'),
  brand_id: z.number().min(1, 'Vui lòng chọn thương hiệu'),
  country_id: z.number().min(1, 'Vui lòng chọn quốc gia'),
  gender_id: z.number().min(1, 'Vui lòng chọn giới tính'),
  imgages: z
    .array(z.object({ images: z.instanceof(File) }))
    .min(1, 'Cần ít nhất 1 hình ảnh'),
  variants: z.array(variantSchema).optional(),
})

type ProductCreateInput = z.input<typeof productsSchema>
type ProductCreateOutput = z.output<typeof productsSchema>

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProductCreate() {
  const [productImagePreviews, setProductImagePreviews] = useState<
    ImagePreview[]
  >([])
  const [isDragging, setIsDragging] = useState(false)

  // Ảnh riêng cho từng biến thể
  const [variantImagePreviews, setVariantImagePreviews] = useState<
    ImagePreview[][]
  >([])

  // attribute_value IDs riêng cho từng biến thể: variantAttributeIds[variantIdx] = [valueId, ...]
  const [variantAttributeIds, setVariantAttributeIds] = useState<number[][]>([])

  const { isPending, isError, data: brands, error } = useBrands()
  const category = useCategories()
  const countries = useCountries()
  const gender = useGenders()
  const { data: attributeGroups } = useProductAttributes()

  const form = useForm<ProductCreateInput, any, ProductCreateOutput>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: '',
      description: '',
      category_id: 0,
      brand_id: 0,
      country_id: 0,
      gender_id: 0,
      imgages: [],
      variants: [],
    },
  })

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control: form.control, name: 'variants' })

  // ── Mutation ──────────────────────────────────────────────────────────────
  const mutation = useMutation({
    mutationFn: (data: ProductCreateOutput) => {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description ?? '')
      formData.append('category_id', String(data.category_id))
      formData.append('brand_id', String(data.brand_id))
      formData.append('country_id', String(data.country_id))
      formData.append('gender_id', String(data.gender_id))

      data.imgages?.forEach((item) => formData.append('images', item.images))

      if (data.variants?.length) {
        const variantsPayload = data.variants.map((v, idx) => ({
          originalPrice: v.originalPrice,
          stock: v.stock,
          discountPercent: v.discountPercent ?? 0,
          costPrice: v.costPrice,
          weight: v.weight,
          note: v.note,
          // mỗi variant gửi đúng attribute_value IDs của nó
          attributeValueIds: variantAttributeIds[idx] ?? [],
          imageKeys: (variantImagePreviews[idx] ?? []).map(
            (_, imgIdx) => `variant_${idx}_img_${imgIdx}`
          ),
        }))
        formData.append('variants', JSON.stringify(variantsPayload))

        variantImagePreviews.forEach((previews, idx) => {
          previews.forEach((p, imgIdx) => {
            formData.append(`variant_${idx}_img_${imgIdx}`, p.file)
          })
        })
      }

      return api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
    onSuccess: () => {
      toast.success('Tạo sản phẩm thành công')
      form.reset()
      setProductImagePreviews([])
      setVariantImagePreviews([])
      setVariantAttributeIds([])
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? 'Tạo sản phẩm thất bại')
    },
  })

  // ── Handlers — ảnh sản phẩm chung ────────────────────────────────────────
  const addProductImages = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) => f.type.startsWith('image/'))
      if (!arr.length) return
      const newPreviews = arr.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))
      setProductImagePreviews((prev) => {
        const merged = [...prev, ...newPreviews]
        form.setValue(
          'imgages',
          merged.map((p) => ({ images: p.file })),
          { shouldValidate: true }
        )
        return merged
      })
    },
    [form]
  )

  const removeProductImage = (index: number) => {
    setProductImagePreviews((prev) => {
      const next = prev.filter((_, i) => i !== index)
      form.setValue(
        'imgages',
        next.map((p) => ({ images: p.file })),
        { shouldValidate: true }
      )
      return next
    })
  }

  // ── Handlers — ảnh biến thể ───────────────────────────────────────────────
  const addVariantImages = (variantIdx: number, files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!arr.length) return
    setVariantImagePreviews((prev) => {
      const next = [...prev]
      const current = next[variantIdx] ?? []
      next[variantIdx] = [
        ...current,
        ...arr.map((file) => ({ file, url: URL.createObjectURL(file) })),
      ]
      return next
    })
  }

  const removeVariantImage = (variantIdx: number, imgIdx: number) => {
    setVariantImagePreviews((prev) => {
      const next = [...prev]
      next[variantIdx] = (next[variantIdx] ?? []).filter((_, i) => i !== imgIdx)
      return next
    })
  }

  // ── Handlers — attribute values theo từng variant ─────────────────────────
  // Chọn 1 value trong group → bỏ value cũ của group đó, thêm value mới
  const selectVariantAttributeValue = (
    variantIdx: number,
    group: AttributeGroup,
    valueId: number
  ) => {
    setVariantAttributeIds((prev) => {
      const next = [...prev]
      const current = next[variantIdx] ?? []
      const groupValueIds = group.values.map((v) => v.id)
      // xóa value cũ của cùng group, thêm value mới
      next[variantIdx] = [
        ...current.filter((id) => !groupValueIds.includes(id)),
        valueId,
      ]
      return next
    })
  }

  // Xóa value của 1 group (bỏ chọn)
  const clearVariantAttributeGroup = (
    variantIdx: number,
    group: AttributeGroup
  ) => {
    setVariantAttributeIds((prev) => {
      const next = [...prev]
      const groupValueIds = group.values.map((v) => v.id)
      next[variantIdx] = (next[variantIdx] ?? []).filter(
        (id) => !groupValueIds.includes(id)
      )
      return next
    })
  }

  // ── Handlers — thêm/xóa biến thể ─────────────────────────────────────────
  const handleAppendVariant = () => {
    appendVariant({
      originalPrice: 0 as any,
      stock: 0 as any,
      discountPercent: 0 as any,
      costPrice: 0 as any,
      weight: 0 as any,
      attributeValueIds: [],
    })
    setVariantImagePreviews((prev) => [...prev, []])
    setVariantAttributeIds((prev) => [...prev, []])
  }

  const handleRemoveVariant = (variantIdx: number) => {
    removeVariant(variantIdx)
    setVariantImagePreviews((prev) => prev.filter((_, i) => i !== variantIdx))
    setVariantAttributeIds((prev) => prev.filter((_, i) => i !== variantIdx))
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    addProductImages(e.dataTransfer.files)
  }

  const onSubmit = (data: ProductCreateOutput) => mutation.mutate(data)

  if (isPending) return <span>Loading...</span>
  if (isError) return <span>Error: {error.message}</span>

  return (
    <div className='min-h-screen bg-slate-50 p-6 md:p-10'>
      <div className='mx-auto max-w-4xl space-y-6'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 text-sm text-slate-500'>
          <span>Sản phẩm</span>
          <ChevronRight className='h-4 w-4' />
          <span className='font-medium text-slate-800'>Thêm mới</span>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='rounded-xl bg-slate-900 p-2'>
              <Package className='h-6 w-6 text-white' />
            </div>
            <div>
              <h1 className='text-2xl font-bold tracking-tight text-slate-900'>
                Thêm sản phẩm mới
              </h1>
              <p className='text-sm text-slate-500'>
                Điền thông tin để tạo sản phẩm
              </p>
            </div>
          </div>
          <Badge variant='outline' className='text-slate-600'>
            Nháp
          </Badge>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* ── Thông tin cơ bản ── */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Thông tin cơ bản</CardTitle>
                <CardDescription>Tên và mô tả sản phẩm</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tên sản phẩm <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Nhập tên sản phẩm...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Mô tả chi tiết sản phẩm...'
                          className='min-h-30 resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* ── Phân loại ── */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Phân loại</CardTitle>
                <CardDescription>
                  Danh mục, thương hiệu, xuất xứ và giới tính
                </CardDescription>
              </CardHeader>
              <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='category_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Danh mục <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Select
                        value={field.value ? String(field.value) : undefined}
                        onValueChange={(v) => field.onChange(Number(v))}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn danh mục' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {category?.data?.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='brand_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Thương hiệu <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn thương hiệu' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brands?.map((b: any) => (
                            <SelectItem key={b.id} value={b.id.toString()}>
                              {b.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='country_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Xuất xứ <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn quốc gia' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries?.data?.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='gender_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Giới tính <span className='text-red-500'>*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn giới tính' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gender?.data?.map((g) => (
                            <SelectItem key={g.id} value={g.id.toString()}>
                              {g.gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* ── Ảnh sản phẩm chung ── */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Hình ảnh sản phẩm</CardTitle>
                <CardDescription>
                  Tải lên ít nhất 1 hình ảnh (PNG, JPG, WEBP)
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={onDrop}
                  onClick={() =>
                    document.getElementById('product-image-input')?.click()
                  }
                  className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors duration-200 ${
                    isDragging
                      ? 'border-slate-900 bg-slate-100'
                      : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <input
                    id='product-image-input'
                    type='file'
                    multiple
                    accept='image/*'
                    className='hidden'
                    onChange={(e) =>
                      e.target.files && addProductImages(e.target.files)
                    }
                  />
                  <div className='rounded-full bg-slate-100 p-3'>
                    <ImagePlus className='h-6 w-6 text-slate-600' />
                  </div>
                  <div className='text-center'>
                    <p className='font-medium text-slate-700'>
                      Kéo thả hoặc{' '}
                      <span className='text-slate-900 underline underline-offset-2'>
                        chọn file
                      </span>
                    </p>
                    <p className='mt-1 text-xs text-slate-400'>
                      PNG, JPG, WEBP — tối đa 10MB mỗi file
                    </p>
                  </div>
                </div>

                {form.formState.errors.imgages && (
                  <p className='text-sm font-medium text-destructive'>
                    {form.formState.errors.imgages.message}
                  </p>
                )}

                {productImagePreviews.length > 0 && (
                  <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5'>
                    {productImagePreviews.map((p, i) => (
                      <div key={i} className='group relative aspect-square'>
                        <img
                          src={p.url}
                          alt={`preview-${i}`}
                          className='h-full w-full rounded-lg border border-slate-200 object-cover'
                        />
                        <button
                          type='button'
                          onClick={() => removeProductImage(i)}
                          className='absolute -top-2 -right-2 rounded-full bg-red-500 p-0.5 text-white opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100 hover:bg-red-600'
                        >
                          <X className='h-3.5 w-3.5' />
                        </button>
                        {i === 0 && (
                          <span className='absolute bottom-1 left-1 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-white'>
                            Chính
                          </span>
                        )}
                      </div>
                    ))}
                    <button
                      type='button'
                      onClick={() =>
                        document.getElementById('product-image-input')?.click()
                      }
                      className='flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-slate-200 transition-colors hover:border-slate-400 hover:bg-slate-50'
                    >
                      <Upload className='h-5 w-5 text-slate-400' />
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ── Biến thể sản phẩm ── */}
            <Card>
              <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                  <CardTitle className='text-base'>Biến thể sản phẩm</CardTitle>
                  <CardDescription>
                    Màu sắc, dung tích, loại da... mỗi biến thể có giá và tồn
                    kho riêng
                  </CardDescription>
                </div>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={handleAppendVariant}
                >
                  <Plus className='mr-1 h-4 w-4' />
                  Thêm biến thể
                </Button>
              </CardHeader>
              <CardContent className='space-y-4'>
                {variantFields.length === 0 && (
                  <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 py-8 text-slate-400'>
                    <Tag className='mb-2 h-8 w-8' />
                    <p className='text-sm'>Chưa có biến thể nào</p>
                    <p className='text-xs'>Nhấn "Thêm biến thể" để bắt đầu</p>
                  </div>
                )}

                {variantFields.map((field, variantIdx) => {
                  const variantPreviews = variantImagePreviews[variantIdx] ?? []
                  const selectedValueIds = variantAttributeIds[variantIdx] ?? []
                  const inputId = `variant-image-input-${variantIdx}`

                  return (
                    <div
                      key={field.id}
                      className='space-y-4 rounded-xl border border-slate-200 bg-white p-4'
                    >
                      {/* Header */}
                      <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium text-slate-700'>
                          Biến thể #{variantIdx + 1}
                        </span>
                        <button
                          type='button'
                          onClick={() => handleRemoveVariant(variantIdx)}
                          className='text-red-400 hover:text-red-600'
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>

                      {/* Giá, tồn kho, giảm giá, cân nặng */}
                      <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
                        <FormField
                          control={form.control}
                          name={`variants.${variantIdx}.originalPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-xs'>
                                Giá gốc <span className='text-red-500'>*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='250000'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`variants.${variantIdx}.stock`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-xs'>
                                Tồn kho <span className='text-red-500'>*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='100'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`variants.${variantIdx}.discountPercent`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-xs'>
                                Giảm giá (%)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='0'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`variants.${variantIdx}.weight`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-xs'>
                                Cân nặng (g)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='200'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Giá vốn */}
                      <div className='grid grid-cols-2 gap-3'>
                        <FormField
                          control={form.control}
                          name={`variants.${variantIdx}.costPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-xs'>Giá vốn</FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='150000'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* ── Thuộc tính — 1 Select per group, chọn value cụ thể ── */}
                      <div className='space-y-3'>
                        <p className='text-xs font-medium text-slate-600'>
                          Thuộc tính
                        </p>

                        {/* Summary tags — hiển thị những gì đã chọn */}
                        {selectedValueIds.length > 0 && (
                          <div className='flex flex-wrap gap-1.5'>
                            {attributeGroups?.map((group: any) => {
                              const selectedVal = group.values.find((v: any) =>
                                selectedValueIds.includes(v.id)
                              )
                              if (!selectedVal) return null
                              return (
                                <span
                                  key={group.id}
                                  className='flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white'
                                >
                                  <span className='text-slate-400'>
                                    {group.name}:
                                  </span>
                                  &nbsp;{selectedVal.value}
                                  <button
                                    type='button'
                                    onClick={() =>
                                      clearVariantAttributeGroup(
                                        variantIdx,
                                        group
                                      )
                                    }
                                    className='ml-0.5 text-slate-400 transition-colors hover:text-red-400'
                                  >
                                    <X className='h-3 w-3' />
                                  </button>
                                </span>
                              )
                            })}
                          </div>
                        )}

                        {/* 1 Select per attribute group */}
                        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                          {attributeGroups?.map((group: any) => {
                            const currentValue = group.values.find((v: any) =>
                              selectedValueIds.includes(v.id)
                            )
                            return (
                              <div key={group.id} className='space-y-1'>
                                <p className='text-[11px] text-slate-500'>
                                  {group.name}
                                </p>
                                <Select
                                  value={
                                    currentValue
                                      ? String(currentValue.id)
                                      : undefined
                                  }
                                  onValueChange={(value) =>
                                    selectVariantAttributeValue(
                                      variantIdx,
                                      group,
                                      Number(value)
                                    )
                                  }
                                >
                                  <SelectTrigger className='h-8 text-xs'>
                                    <SelectValue
                                      placeholder={`Chọn ${group.name}`}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {group.values.map((val: any) => (
                                        <SelectItem
                                          key={val.id}
                                          value={String(val.id)}
                                        >
                                          {val.value}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* ── Ảnh biến thể ── */}
                      <div className='space-y-2'>
                        <p className='text-xs font-medium text-slate-600'>
                          Hình ảnh biến thể
                          <span className='ml-1 font-normal text-slate-400'>
                            ({variantPreviews.length} ảnh)
                          </span>
                        </p>

                        <div className='grid grid-cols-4 gap-2 sm:grid-cols-6'>
                          {variantPreviews.map((p, imgIdx) => (
                            <div
                              key={imgIdx}
                              className='group relative aspect-square'
                            >
                              <img
                                src={p.url}
                                alt={`variant-${variantIdx}-img-${imgIdx}`}
                                className='h-full w-full rounded-lg border border-slate-200 object-cover'
                              />
                              <button
                                type='button'
                                onClick={() =>
                                  removeVariantImage(variantIdx, imgIdx)
                                }
                                className='absolute -top-1.5 -right-1.5 rounded-full bg-red-500 p-0.5 text-white opacity-0 shadow transition-opacity group-hover:opacity-100 hover:bg-red-600'
                              >
                                <X className='h-3 w-3' />
                              </button>
                              {imgIdx === 0 && (
                                <span className='absolute bottom-1 left-1 rounded bg-slate-900 px-1 py-0.5 text-[9px] text-white'>
                                  Chính
                                </span>
                              )}
                            </div>
                          ))}

                          <label
                            htmlFor={inputId}
                            className='flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 transition-colors hover:border-slate-400 hover:bg-slate-50'
                          >
                            <input
                              id={inputId}
                              type='file'
                              multiple
                              accept='image/*'
                              className='hidden'
                              onChange={(e) =>
                                e.target.files &&
                                addVariantImages(variantIdx, e.target.files)
                              }
                            />
                            <ImagePlus className='h-4 w-4 text-slate-400' />
                            <span className='text-[10px] text-slate-400'>
                              Thêm ảnh
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Ghi chú */}
                      <FormField
                        control={form.control}
                        name={`variants.${variantIdx}.note`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-xs'>Ghi chú</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Ghi chú cho biến thể này...'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* ── Actions ── */}
            <Separator />
            <div className='flex items-center justify-end gap-3 pb-8'>
              <Button type='button' variant='outline'>
                Hủy
              </Button>
              <Button type='button' variant='ghost'>
                Lưu nháp
              </Button>
              <Button type='submit' className='bg-slate-900 hover:bg-slate-700'>
                {mutation.isPending ? 'Đang tạo...' : 'Tạo sản phẩm'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
