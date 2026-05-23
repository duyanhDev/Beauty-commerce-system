import z from 'zod'

const parentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  slug: z.string(),
  created_at: z.coerce.date(),
})

const childrenSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  slug: z.string(),
  created_at: z.coerce.date(),
})

export const categorySchema = z.object({
  id: z.number(),

  name: z.string(),

  description: z.string().nullable().optional(),

  slug: z.string(),

  parent: parentSchema.nullable(),
  children: z.array(childrenSchema),

  created_at: z.coerce.date(),
})

export const categoriesArraySchema = z.array(categorySchema)

export type Categories = z.infer<typeof categorySchema>
