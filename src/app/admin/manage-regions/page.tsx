import React from 'react'
import AddRegions from './_components/add-regions'
import RegionsTable from './_components/regions-table'
import { apiRequest } from '@/lib/api'

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'

export const dynamic = 'force-dynamic'

export const fetchRegions = async () => {
    return apiRequest({ url: '/api/region' });
}

async function ManageRegions() {

    const queryClient=new QueryClient()

  await queryClient.prefetchQuery({
        queryKey:['regions'],
        queryFn:fetchRegions
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='px-4 py-4'>
            <h1 className='admin-heading'>Manage Regions</h1>
            <div className='flex justify-end pt-3 pr-4'>
                <AddRegions />
            </div>
            <div className='mt-2 mb-3 md:mb-28'>
                <RegionsTable/>
            </div>
        </div>
        </HydrationBoundary>
    )
}

export default ManageRegions
