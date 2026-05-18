import { z } from 'zod'

const userStatusSchema = z.union([z.literal('active'), z.literal('suspended')])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
  z.literal('customer'),
])

const _userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  role: userRoleSchema,
  avatarUrl: z.string(),
  created_at: z.coerce.date(),
  status: userStatusSchema,
})
export type User = z.infer<typeof _userSchema>
