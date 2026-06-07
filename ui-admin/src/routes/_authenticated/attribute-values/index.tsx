import { createFileRoute } from '@tanstack/react-router'
import { Attribute_values } from '@/features/attribute-values'

export const Route = createFileRoute('/_authenticated/attribute-values/')({
  component: Attribute_values,
})
