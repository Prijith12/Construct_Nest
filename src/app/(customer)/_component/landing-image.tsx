"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/search-bar'
import { MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

function LandingImage() {
  const handleSearch=()=>{
    toast.error("Search feature is currently on development and not available at the moment");
  }

  return (
    <div>
        <div className="w-full relative h-[45dvh] md:h-[70dvh]"> 
                <Image
                    src="/home-page-img3.png"
                    alt="Construction Site"
                    layout="fill"
                    quality={100}
                    priority
                />
                <div className="absolute inset-0 md:left-24 flex justify-center md:justify-start md:items-center z-20 pt-6 md:pt-0 p-2">
                    <div>
                    <h1 className='text-white text-base md:text-2xl italic font-semibold font-serif pb-3'>From Foundation to Roof, We Build It All</h1>
                    <SearchBar onClick={handleSearch}/>
                    </div>
                    <Button className='absolute bottom-16 right-0 w-16 md:w-20 h-12 md:h-16 bg-gray-500 opacity-85 rounded-md cursor-pointer hover:scale-105 hover:bg-gray-600'>
                        <div>
                        <span className='font-serif text-xs md:text-sm'>FeedBack</span>
                        <MessageSquare className='text-white size-3 md:size-5'/>
                        </div>

                    </Button>
                </div>
            </div>
    </div>
  )
}

export default LandingImage
