import React from 'react'
import {Clock,LoaderCircle} from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"


export function LoadingSkeleton() {
  return (
    <div className='flex pt-32 justify-center w-full min-h-screen bg-opacity-15 bg-gray-200'>
      <div>
      <div className='flex text-gray-400 animate-pulse'>    
      <Clock />
      <span className='pl-2 '>Loading...</span>
      </div>
      <div className="flex items-center space-x-4 pt-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      </div>
      </div>

        </div>
  )
}

export function SingleSkeleton(){

  return(
    <div className="flex justify-center space-x-4 mt-28">
      <div>
      <div className='flex text-gray-400 animate-pulse'>    
      <Clock />
      <span className='pl-2 '>Loading...</span>
      </div>
      <div className="flex items-center space-x-4 pt-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      </div>
      </div>
      </div>
  )

}

export function Spinner(){
  return (
    <>
    <LoaderCircle className='animate-spin'/>
    </>
  )
}

