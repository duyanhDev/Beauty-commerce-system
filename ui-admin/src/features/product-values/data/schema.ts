import { z } from 'zod'

export const productValueSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string(),
})

export type ProductValue = z.infer<typeof productValueSchema>
