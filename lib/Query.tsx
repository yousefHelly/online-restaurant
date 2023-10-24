'use client'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
type Props = {}

function Query({
    children
}: {
    children: React.ReactNode
}) {
    const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {
        children
      }
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default Query