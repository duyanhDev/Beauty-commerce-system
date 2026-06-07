import { createFileRoute } from '@tanstack/react-router'
import { ProductValues } from '@/features/product-values'

export const Route = createFileRoute('/_authenticated/product-values/')({
  component: ProductValues,
})
