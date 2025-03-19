"use client"

import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SingleSkeleton } from '@/components/loading/Loading';
import { useQueryClient } from '@tanstack/react-query';
import { allRegion } from '@/services/regions';
import { apiRequest } from '@/lib/api';
import { log } from 'console';

export type Regions = {
    id: number
    region: string
}

export const allRegionsQuery=async()=>{
    const data=await allRegion();
    return data;
}

function RegionsTable() {

    const queryClient=useQueryClient()
    const { data: regions, isLoading } = useQuery({ queryKey: ['regions'], queryFn:allRegionsQuery});
    console.log(regions);
    
    const {mutate,isPending}=useMutation({
        mutationFn:({id}:{id:number})=>{
            return apiRequest({ url: '/api/region', body: { id }, method: 'DELETE' });
        },
        onSuccess:()=>{
            return queryClient.invalidateQueries({queryKey:['regions']});
        }
    }
    
);

    const handleDelete = async ({ id }: { id: number }) => {
        mutate({id});
    }

    const columns: ColumnDef<Regions>[] = [
        {
            accessorKey: "id",
            header: "Id"
        },
        {
            accessorKey: "region",
            header: "Region"
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
    if (isLoading||isPending) return <><SingleSkeleton /></>
    return (
        <div>
            <DataTable columns={columns} data={regions ? regions : []} />
        </div>
    )
}

export default RegionsTable
