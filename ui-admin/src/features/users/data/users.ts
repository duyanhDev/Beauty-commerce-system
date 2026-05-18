import { useQuery } from '@tanstack/react-query'
import { faker } from '@faker-js/faker'
import { api } from '@/lib/axios'
import { User } from './schema'

// fake data
faker.seed(67890)

const fetchDataUsers = async () => {
  try {
    const res = await api.get('/users')
    console.log(res.data?.data)

    return res.data.data as User[]
  } catch (error: any) {
    throw new Error(error.message)
  }
}

// custom hook
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchDataUsers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

// fake users
export const users = Array.from({ length: 500 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet.username({ firstName, lastName }).toLowerCase(),
    email: faker.internet.email({ firstName }).toLowerCase(),
    phoneNumber: faker.phone.number({
      style: 'international',
    }),
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
      'invited',
      'suspended',
    ]),
    role: faker.helpers.arrayElement([
      'superadmin',
      'admin',
      'cashier',
      'manager',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
