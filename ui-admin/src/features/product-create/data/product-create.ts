import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export type Gender = {
  id: number
  gender: string
}

export type Country = {
  id: number
  name: string
}

export type Brand = {
  id: number
  name: string
}

const fetchGenderData = async () => {
  try {
    const res = await api.get('/gender')

    if (res && res.data.EC === 0) {
      return res.data.data as Gender[]
    }

    return []
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 'Lỗi khi lấy danh sách gender'
    )
  }
}

const fetchCountryData = async () => {
  try {
    const res = await api.get('/country')

    if (res && res.data.EC === 0) {
      return res.data.data as Country[]
    }

    return []
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 'Lỗi khi lấy danh sách country'
    )
  }
}

const fetchBrandData = async () => {
  try {
    const res = await api.get('/brand')

    if (res && res.data.EC === 0) {
      return res.data?.data as Brand[]
    }

    return []
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 'Lỗi khi lấy danh sách brand'
    )
  }
}

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrandData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountryData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

export const useGenders = () => {
  return useQuery({
    queryKey: ['genders'],
    queryFn: fetchGenderData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}
