import { createFileRoute } from '@tanstack/react-router'
import ProductCreate from '@/features/product-create'

export const Route = createFileRoute('/_authenticated/product-create/')({
  component: ProductCreate,
})
