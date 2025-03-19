import React from 'react'
import AddRegions from './_components/add-regions'
import RegionsTable from './_components/regions-table'
import RegionsProvider from './_components/regions-provider'
import { apiRequest } from '@/lib/api'

export const dynamic = 'force-dynamic'

export const fetchRegions = async () => {
    return apiRequest({ url: '/api/region' });
}

async function ManageRegions() {
    return (
        <RegionsProvider>
            <div className='px-4 py-4'>
                <h1 className='admin-heading'>Manage Regions</h1>
                <div className='flex justify-end pt-3 pr-4'>
                    <AddRegions />
                </div>
                <div className='mt-2 mb-3 md:mb-28'>
                    <RegionsTable />
                </div>
            </div>
        </RegionsProvider>
    )
}

export default ManageRegions
