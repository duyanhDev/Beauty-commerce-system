import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '@/lib/axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface VolumeFormData {
  name: string
  description: string
}

const INITIAL_FORM: VolumeFormData = {
  name: '',
  description: '',
}

interface VolumeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VolumeDialog({ open, onOpenChange }: VolumeDialogProps) {
  const [formData, setFormData] = useState<VolumeFormData>(INITIAL_FORM)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData)

    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (formData: VolumeFormData) => {
      return api.post('/product-attributes', {
        name: formData.name,
        description: formData.description,
      })
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['attribute-values'] })
      toast.success('Thêm thành công dung tích mới')
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormData(INITIAL_FORM)
    onOpenChange(false)
    await mutation.mutateAsync(formData)
  }

  const handleClose = () => {
    setFormData(INITIAL_FORM)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tạo dung tích sản phẩm</DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Tên dung tích</Label>
              <Input
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='VD: 500ml'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Mô tả</Label>
              <Input
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='VD: Chai nhỏ dùng một lần'
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline' onClick={handleClose}>
                Hủy
              </Button>
            </DialogClose>
            <Button type='submit'>Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
