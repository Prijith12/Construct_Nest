import React from 'react'
import AddRegions from './_components/add-regions'
import RegionsTable from './_components/regions-table'




async function ManageRegions() {
    return (
            <div className='px-4 py-4'>
                <h1 className='admin-heading'>Manage Regions</h1>
                <div className='flex justify-end pt-3 pr-4'>
                    <AddRegions />
                </div>
                <div className='mt-2 mb-3 md:mb-28'>
                    <RegionsTable />
                </div>
            </div>
    )
}

export default ManageRegions
