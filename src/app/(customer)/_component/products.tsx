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

function Products() {
  const products = [{ name: "Brick", price: 15, image: "2025-02-15T09-06-05.701Z.jpeg", unit: "1 brick", rating: 5 },{ name: "Brick", price: 15, image: "2025-02-15T09-06-05.701Z.jpeg", unit: "1 brick", rating: 5 },{ name: "Brick", price: 15, image: "2025-02-15T09-06-05.701Z.jpeg", unit: "1 brick", rating: 5 },{ name: "Brick", price: 15, image: "2025-02-15T09-06-05.701Z.jpeg", unit: "1 brick", rating: 5 } ]
  return (
    <div className='m-4 md:m-7'>
      <h1 className='text-center text-2xl md:text-4xl font-serif font-extralight italic text-gray-700 pt-9 md:pt-12 pb-2 md:pb-3' >Our Products</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {
          products.map((provider, index) => (
            <ProductsCard key={index} {...provider}  />
          ))
        }
      </div>
    </div>
  )
}

const ProductsCard = ({ name,price, image, unit, rating}: { name: string, price: number, image: string, unit: string, rating: number }) => {
  return (
    <Card className='w-auto h-auto'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className='pt-3'>
        <div className='w-full h-auto'>
          <Image src={`/${image}`} alt='..'  width={600} height={600} className='w-full h-full object-cover rounded-sm' />
        </div>
        <div className='my-4'>
          <div className='grid grid-cols-2 gap-2'>
            <Label className='font-medium'>Price</Label>
            <Label>: {price}</Label>
            <Label className='font-medium'>Unit</Label>
            <Label>: {unit}</Label>
          </div>
        </div>
        <StarRating rating={rating}/>
        <Button className='bg-blue-700 mt-4 hover:bg-blue-800'>Buy Product</Button>
      </CardContent>
    </Card>
  )
}

export default Products
