import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/lib/axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

type Translation = {
  language: string
  name: string
}

type CreateCategoryDto = {
  name: string
  parentId: number | null
  translation: Translation[]
}

export function DialogCategories({ open, setOpen }: Props) {
  const [name, setName] = useState<string>('')
  const [parentId, setParentId] = useState<number | null>(null)
  const [translations, setTranslations] = useState<Translation[]>([
    { language: '', name: '' },
  ])

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: CreateCategoryDto) => {
      return api.post('/categories', data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Thêm danh mục thành công')
      setOpen(false)
      setName('')
      setParentId(null)
      setTranslations([{ language: '', name: '' }])
    },
    onError: () => {
      toast.error('Đã xảy ra lỗi, vui lòng thử lại')
    },
  })

  const updateTranslation = (
    index: number,
    field: keyof Translation,
    value: string
  ) => {
    setTranslations((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  // Thêm dòng translation mới
  const addTranslation = () => {
    setTranslations((prev) => [...prev, { language: '', name: '' }])
  }

  // Xóa 1 dòng translation
  const removeTranslation = (index: number) => {
    setTranslations((prev) => prev.filter((_, i) => i !== index))
  }

  const onSaveCategories = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.warning('Vui lòng nhập tên danh mục')
      return
    }

    if (translations.some((t) => !t.language.trim() || !t.name.trim())) {
      toast.warning('Vui lòng điền đầy đủ thông tin ngôn ngữ')
      return
    }

    mutation.mutate({ name, parentId, translation: translations })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <form onSubmit={onSaveCategories}>
          <DialogHeader>
            <DialogTitle>Thêm danh mục sản phẩm</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col gap-4 py-4'>
            {/* Tên danh mục */}
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='name'>Tên danh mục</Label>
              <Input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nhập tên danh mục'
              />
            </div>

            {/* Danh mục cha */}
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='parentId'>Danh mục cha (ID)</Label>
              <Input
                id='parentId'
                type='number'
                value={parentId ?? ''}
                onChange={(e) =>
                  setParentId(e.target.value ? Number(e.target.value) : null)
                }
                placeholder='Nhập ID danh mục cha'
              />
            </div>

            {/* Translations */}
            <div className='flex flex-col gap-2'>
              <Label>Ngôn ngữ</Label>

              {translations.map((t, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <Input
                    value={t.language}
                    onChange={(e) =>
                      updateTranslation(index, 'language', e.target.value)
                    }
                    placeholder='vd: en, vi'
                    className='w-24'
                  />
                  <Input
                    value={t.name}
                    onChange={(e) =>
                      updateTranslation(index, 'name', e.target.value)
                    }
                    placeholder='Tên theo ngôn ngữ'
                  />
                  {translations.length > 1 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      onClick={() => removeTranslation(index)}
                    >
                      <Trash2 className='h-4 w-4 text-destructive' />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addTranslation}
                className='w-fit'
              >
                <Plus className='mr-1 h-4 w-4' />
                Thêm ngôn ngữ
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              type='button'
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>
            <Button type='submit' disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang lưu...' : 'Lưu'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
