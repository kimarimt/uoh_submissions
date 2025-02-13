import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useToggleAlert } from '../components/contexts/AlertContext'
import blogService from '../services/blog'

export const useBlogs = () =>
  useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

export const useComments = id =>
  useQuery({
    queryKey: ['comments'],
    queryFn: () => blogService.getComments(id),
  })

export const useMutations = () => {
  const queryClient = useQueryClient()
  const toggleAlert = useToggleAlert()

  const handleError = (error, color = 'red') => {
    const message = error.response.data.error
    toggleAlert(message, color)
  }

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
      handleError(error)
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: newBlog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(blog => (blog.id === newBlog.id ? newBlog : blog))
      )
    },
    onError: error => {
      handleError(error)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
    onError: error => {
      handleError(error)
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: blogService.postComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      handleError(error)
    }
  })

  return {
    newBlogMutation,
    updateBlogMutation,
    deleteBlogMutation,
    addCommentMutation
  }
}
