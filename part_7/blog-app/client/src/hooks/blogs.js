import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useToggleAlert } from '../components/AlertContext'
import blogService from '../services/blog'

export const useBlogs = () =>
  useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

export const useMutations = () => {
  const queryClient = useQueryClient()
  const toggleAlert = useToggleAlert()

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: newBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...blogs, newBlog])
      toggleAlert(
        `New blog ${newBlog.title} by ${newBlog.author} has beed added`
      )
    },
    onError: error => {
      const message = error.response.data.error
      toggleAlert(message, 'red')
    },
  })

  return {
    newBlogMutation,
  }
}
