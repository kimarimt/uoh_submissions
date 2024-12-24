import { useMutation, useQuery } from '@tanstack/react-query'
import { createAnecdote, updateAnecdote, getAnecdotes } from '../services/anecdotes'

export const useAnecdotesQuery = () => {
  return useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })
}

export const useNewAnecdoteMutation = queryClient => {
  return useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient
        .setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })
}

export const useUpdateAnecdoteMutation = queryClient => {
  return useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient
        .setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    }
  })
}