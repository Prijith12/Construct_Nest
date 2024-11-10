import React from 'react'
import UsersTable from './users-table'
import { User } from './users-table'

function Users({userDetails}:{userDetails:User[]}) {
  return (
    <div className='flex flex-col items-center justify-center mt-20 px-10'>
      <h1 className='pb-4 text-lg font-semibold'>Manage Users</h1>
      <div className='w-full'>
        <UsersTable data={userDetails}/>
      </div>
    </div>
  )
}

export default Users
