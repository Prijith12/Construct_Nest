"use client"
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { allProducts } from '@/services/products';
import { SingleSkeleton } from '@/components/loading/Loading';
import Image from 'next/image';
import { deleteProduct } from '@/services/products';
import type { Product } from '../page';



const allProductsQuery=async()=>{
    const data=await allProducts();
    return data;
}


function ProductsTable() {
    const queryClient=useQueryClient();

    const {data:products,isLoading}=useQuery({queryKey:['products'],queryFn:allProductsQuery
    });

    const {mutate,isPending}=useMutation({
        mutationFn:({productId}:{productId:number})=>{
           return deleteProduct({productId});
        },
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['products']})
    })
    
    const handleDelete=({productId}:{productId:number})=>{
        mutate({productId});
    }

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "productId",
            header: "Id"
        },
        {
            accessorKey: "name",
            header: "Name"
        },
        {
            accessorKey: "price",
            header: "Price"
        },
        {
            accessorKey: "unit",
            header: "Unit"
        },
        {
            accessorKey: "image",
            header: "Image",
            cell:({row})=>{
                const url=row.original.image
                return(
                    <div className='flex w-16 h-14'>
                    <Image src={`/${url}`}alt='...'width={100} height={100} className='text-center rounded-sm'/>
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
                const productId = row.original.productId||0;
                return (
                    <div className='flex space-x-2'>
                        <Button onClick={() => handleDelete({ productId })}><Trash2 className='hover:scale-110' /></Button>

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
      <DataTable columns={columns} data={products||[]}/>
    </div>
  )
}

export default ProductsTable
