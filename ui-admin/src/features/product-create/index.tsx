'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Upload, X, ImagePlus, Package, ChevronRight } from 'lucide-react'
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useCategories } from '../categories/data/categories'
import { useBrands, useCountries, useGenders } from './data/product-create'
import { productsSchema, type ProductCreate } from './data/schema'

const CATEGORIES = [
  { id: 1, name: 'Áo' },
  { id: 2, name: 'Quần' },
  { id: 3, name: 'Giày' },
  { id: 4, name: 'Phụ kiện' },
]

const COUNTRIES = [
  { id: 1, name: 'Việt Nam' },
  { id: 2, name: 'Trung Quốc' },
  { id: 3, name: 'Hàn Quốc' },
  { id: 4, name: 'Mỹ' },
]

interface ImagePreview {
  file: File
  url: string
}

export default function ProductCreate() {
  // ── Tất cả hooks phải ở trên cùng, trước mọi early return ──────────────────
  const [previews, setPreviews] = useState<ImagePreview[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const { isPending, isError, data, error } = useBrands()
  const category = useCategories()
  const countries = useCountries()
  const gender = useGenders()

  const mutation = useMutation({
    mutationFn: (data: ProductCreate) => {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description ?? '')
      formData.append('category_id', String(data.category_id))
      formData.append('brand_id', String(data.brand_id))
      formData.append('country_id', String(data.country_id))
      formData.append('gender_id', String(data.gender_id))
      data.imgages?.forEach((item) => {
        formData.append('images', item.images)
      })
      return api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
    onSuccess: () => {
      toast.success('Tạo sản phẩm thành công')
      form.reset()
      setPreviews([])
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? 'Tạo sản phẩm thất bại')
    },
  })

  const form = useForm<ProductCreate>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: '',
      description: '',
      category_id: 0,
      brand_id: 0,
      country_id: 0,
      gender_id: 0,
      imgages: [],
    },
  })

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files).filter((f) => f.type.startsWith('image/'))
      if (!arr.length) return

      const newPreviews = arr.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }))

      setPreviews((prev) => {
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

  // ── Early returns SAU tất cả hooks ─────────────────────────────────────────
  if (isPending) return <span>Loading...</span>
  if (isError) return <span>Error: {error.message}</span>

  // ── Handlers (không phải hook, đặt ở đây được) ─────────────────────────────
  const removeImage = (index: number) => {
    setPreviews((prev) => {
      const next = prev.filter((_, i) => i !== index)
      form.setValue(
        'imgages',
        next.map((p) => ({ images: p.file })),
        { shouldValidate: true }
      )
      return next
    })
  }

  console.log(category)

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const onSubmit = (data: ProductCreate) => {
    mutation.mutate(data)
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className='min-h-screen bg-slate-50 p-6 md:p-10'>
      <div className='mx-auto max-w-4xl space-y-6'>
        {/* Header */}
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
            {/* ── Basic Info ── */}
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

            {/* ── Classification ── */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Phân loại</CardTitle>
                <CardDescription>
                  Danh mục, thương hiệu, xuất xứ và giới tính
                </CardDescription>
              </CardHeader>
              <CardContent className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {/* Category */}
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

                {/* Brand */}
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
                          {data?.map((b: any) => (
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

                {/* Country */}
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

                {/* Gender */}
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

            {/* ── Images ── */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Hình ảnh sản phẩm</CardTitle>
                <CardDescription>
                  Tải lên ít nhất 1 hình ảnh (PNG, JPG, WEBP)
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Drop zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={onDrop}
                  className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors duration-200 ${
                    isDragging
                      ? 'border-slate-900 bg-slate-100'
                      : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                  onClick={() =>
                    document.getElementById('image-input')?.click()
                  }
                >
                  <input
                    id='image-input'
                    type='file'
                    multiple
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => e.target.files && addFiles(e.target.files)}
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

                {/* Validation message */}
                {form.formState.errors.imgages && (
                  <p className='text-sm font-medium text-destructive'>
                    {form.formState.errors.imgages.message}
                  </p>
                )}

                {/* Previews grid */}
                {previews.length > 0 && (
                  <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5'>
                    {previews.map((p, i) => (
                      <div key={i} className='group relative aspect-square'>
                        <img
                          src={p.url}
                          alt={`preview-${i}`}
                          className='h-full w-full rounded-lg border border-slate-200 object-cover'
                        />
                        <button
                          type='button'
                          onClick={() => removeImage(i)}
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

                    {/* Add more tile */}
                    <button
                      type='button'
                      onClick={() =>
                        document.getElementById('image-input')?.click()
                      }
                      className='flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-slate-200 transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50'
                    >
                      <Upload className='h-5 w-5 text-slate-400' />
                    </button>
                  </div>
                )}
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
