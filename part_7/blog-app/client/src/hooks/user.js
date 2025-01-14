import { useQuery } from '@tanstack/react-query'
import userService from '../services/user'

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })
