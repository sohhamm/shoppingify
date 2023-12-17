import {QueryClient, QueryClientProvider} from '@tanstack/solid-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App(props) {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}
