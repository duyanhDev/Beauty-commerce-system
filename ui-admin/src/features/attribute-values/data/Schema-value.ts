import { z } from 'zod'

export const SchemaAttribute = z.object({
  id: z.number(),
  name: z.string(),
})

export const SchemaAttributeValue = z.object({
  id: z.number().optional(),
  value: z.string(),
  attribute: SchemaAttribute,
})

export type AttributeValue = z.infer<typeof SchemaAttributeValue>
