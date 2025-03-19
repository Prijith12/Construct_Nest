"use client"
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { allServiceProviders } from '@/services/service-providers';
import { deleteServiceProvider } from '@/services/service-providers';
import { SingleSkeleton } from '@/components/loading/Loading';
import Image from 'next/image';


export type Providers={
    id:number
    name:string
    service:string
    mobile:string
    rating:number
    image:string
}

const providers=async()=>{
    const data=await allServiceProviders();
    return data;
}

function ProvidersTable() {
    const queryClient=useQueryClient();

    const {data:serviceProviders,isLoading}=useQuery({queryKey:['service-providers'],queryFn:providers});

    const {mutate,isPending}=useMutation({
        mutationFn:({id}:{id:number})=>{
           return deleteServiceProvider({id})
        },
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['service-providers']})
    })
    
    const handleDelete=({id}:{id:number})=>{
        mutate({id});
    }

    const columns: ColumnDef<Providers>[] = [
        {
            accessorKey: "id",
            header: "Id"
        },
        {
            accessorKey: "name",
            header: "Name"
        },
        {
            accessorKey: "service",
            header: "Service"
        },
        {
            accessorKey: "mobile",
            header: "Mobile Number"
        },
        {
            accessorKey: "image",
            header: "Image",
            cell:({row})=>{
                const url=row.original.image
                return(
                    <div className='flex w-16 h-14'>
                    <Image src={`${url}`}alt='...'width={100} height={100} className='text-center rounded-sm'/>
                    </div>
                )
            }
        },
        {
            accessorKey: "rating",
            header: "Rating(1-5)"
        },
        {
            id: "actions",
            header: "Delete",
            cell: ({ row }) => {
                const id = row.original.id
                return (
                    <div className='flex space-x-2'>
                        <Button onClick={() => handleDelete({ id })}><Trash2 className='hover:scale-110' /></Button>

                    </div>
                )
            }
        }
    ]
if(isLoading||isPending){
    return(
        <>
        <SingleSkeleton/>
        </>
    )
}
  return (
    <div>
      <DataTable columns={columns} data={serviceProviders||[]}/>
    </div>
  )
}

export default ProvidersTable
