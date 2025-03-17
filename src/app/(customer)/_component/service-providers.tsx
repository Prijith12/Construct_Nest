"use client"
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { Lock } from "lucide-react";
import { StarRating } from '@/components/StarRating';
import { Button } from '@/components/ui/button'

function ServiceProviders() {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const serviceproviders = [{ service: "Plumbing", name: "Thankachan", image: "Plumbing 2025-02-28 224631.jpeg", mobile: "9048649306", rating: 5 }, { service: "Plumbing", name: "Thankachan", image: "Plumbing 2025-02-28 224631.jpeg", mobile: "9048649306", rating: 2 }, { service: "Plumbing", name: "Thankachan", image: "Plumbing 2025-02-28 224631.jpeg", mobile: "9048649306", rating: 3 }, { service: "Plumbing", name: "Thankachan", image: "Plumbing 2025-02-28 224631.jpeg", mobile: "9048649306", rating: 4 }]
  return (
    <div className='m-4 md:m-7' id='providers'>
      <h1 className='text-center text-2xl md:text-4xl font-serif font-extralight italic text-gray-700 pt-9 md:pt-12 pb-2 md:pb-3' >Service Providers</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {
          serviceproviders.map((provider, index) => (
            <ServiceProvidersCard key={index} {...provider} isSubscribed={isSubscribed} />
          ))
        }
      </div>
    </div>
  )
}

const ServiceProvidersCard = ({ service, name, image, mobile, rating, isSubscribed }: { service: string, name: string, image: string, mobile: string, rating: number, isSubscribed: boolean }) => {
  return (
    <Card className='w-auto h-auto'>
      <CardHeader>
        <CardTitle>{service}</CardTitle>
      </CardHeader>
      <CardContent className='pt-3'>
        <div className='w-full h-auto'>
          <Image src={`/${image}`} alt='..'  width={600} height={600} className='w-full h-full object-cover rounded-sm' />
        </div>
        <div className='mt-4'>
          <div className='grid grid-cols-2 gap-2'>
            <Label className='font-medium'>Provider Name</Label>
            <Label>: {name}</Label>
            <Label className='font-medium'>Mobile</Label>
            <div className="flex items-center gap-1">
              {isSubscribed ? <Label>: {mobile}</Label> : <Label>: **********</Label>}
              {!isSubscribed && <Lock size={14} className="text-gray-500" />}
            </div>
          </div>
        </div>
        {!isSubscribed && (
          <p className="text-xs text-red-500 mt-2">Subscribe to view Mobile Number</p>
        )}
        <StarRating rating={rating} />
        <Button className='bg-blue-700 mt-4 hover:bg-blue-800'>Connect With Provider</Button>
      </CardContent>
    </Card>
  )
}

export default ServiceProviders
