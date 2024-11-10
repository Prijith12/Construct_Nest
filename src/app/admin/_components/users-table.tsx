import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'



export type User={
    userId:number
    userName:string|null
    email:string
    role:string
}

function UsersTable({data}:{data:User[]}) {

    const columns:ColumnDef<User>[]=[
        {
            accessorKey: "userId",
            header: "Id",
          },
          {
            accessorKey: "userName",
            header: "User Name",
          },
          {
            accessorKey: "email",
            header: "Email",
          },
          {
            accessorKey: "role",
            header: "Role",
          }
    ]
    return (
        <>
        <DataTable columns={columns} data={data}/>
        </>
    )
}

export default UsersTable
