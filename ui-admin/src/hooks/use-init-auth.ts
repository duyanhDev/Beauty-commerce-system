import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { api } from '@/lib/axios'

export function useInitAuth() {
  const { auth } = useAuthStore()

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await api.get('/auth/me')
      auth.setUser(res.data.user)
      auth.setSessionId(res.data.sessionId)
      return res.data
    },
    retry: false, // 401 thì thôi, không retry
    staleTime: Infinity, // không tự fetch lại
  })
}
