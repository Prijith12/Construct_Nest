import React from 'react'
import AddProviders from './_components/add-service-provider'
import ProvidersTable from './_components/providers-table'
import { allServiceProviders } from '@/services/service-providers'
import { log } from 'console';


async function  page() {
  const data=await allServiceProviders();
  console.log(data);
  
  return (
    <div className='px-4 py-4'>
      <h1 className='text-lg font-serif font-bold text-center'>Service providers</h1>
      <div className='flex justify-end pt-3 pr-4'>
        <AddProviders/>
      </div>
      <div className='mt-2'>
        <ProvidersTable/>
      </div>
    </div>
  )
}

export default page
