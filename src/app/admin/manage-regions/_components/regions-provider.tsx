'use client'

import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query'
import { useState } from 'react'

export default function RegionsProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydrate(queryClient)}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    )
}
