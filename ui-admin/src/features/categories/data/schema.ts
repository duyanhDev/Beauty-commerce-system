import z from 'zod'

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),

  description: z.string().nullable().optional(),

  slug: z.string(),

  parent_id: z.number().nullable().optional(),

  created_at: z.coerce.date(),
})

export const categoriesArraySchema = z.array(categorySchema)

export type Categories = z.infer<typeof categorySchema>
