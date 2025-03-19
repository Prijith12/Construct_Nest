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
import type { Product } from '@/app/admin/manage-products/page'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { sendEmail } from '@/lib/email'
import z from 'zod'

const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    product: z.string().min(3, "Service type must be at least 3 characters"),
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

function Products({products}:{products:Product[]}) {
  return (
    <div className='m-4 md:m-7' id='products'>
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

const ProductsCard = ({ name,price, image, unit, rating}: { name: string, price: number, image: string, unit: string|null, rating: number|null }) => {
  const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormType>({ name: '', mobile: '', product:name, serviceRequest: true });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async() => {
      try{
        setIsLoading(true);
        const result= productSchema.safeParse(formData);
        if(!result.success){
          toast.error("Please check the mobile number and ensure all fields are filled correctly");
          return;
        }
        const success=await sendEmail(formData);
        if(success){
          toast.success("Your request has been submitted!");
        }else{
          toast.error("Error submitting the request. Please try again.");
          return;
        }
        setFormData({ name: '', mobile: '', product:name, serviceRequest: true });
        setOpen(false);
  
      }finally{
        setIsLoading(false);
      }
    }

  return (
    <Card className='w-auto h-auto'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className='pt-3'>
        <div className='w-full h-auto'>
          <Image src={`${image}`} alt='..'  width={600} height={600} className='w-full h-full object-cover rounded-sm' />
        </div>
        <div className='my-4'>
          <div className='grid grid-cols-2 gap-2'>
            <Label className='font-medium'>Price</Label>
            <Label>:{price}</Label>
            <Label className='font-medium'>Unit</Label>
            <Label>:{unit}</Label>
          </div>
        </div>
        <StarRating rating={rating||5}/>
        <Button className='bg-blue-700 mt-4 hover:bg-blue-800' onClick={()=>setOpen(true)}>Buy Product</Button>
        <ProductDialog formData={formData} isLoading={isLoading} open={open} product={name} setFormData={setFormData} setOpen={setOpen} handleSubmit={handleSubmit}/>
      </CardContent>
    </Card>
  )
}

const ProductDialog = ({ open, setOpen, formData, setFormData, isLoading, handleSubmit, product }: { open: boolean, product: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, formData: FormType, setFormData: React.Dispatch<React.SetStateAction<FormType>>, isLoading: boolean, handleSubmit: () => void }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
      <DialogHeader className="space-y-2">
          <div className="bg-gray-100 p-3 rounded-md border-l-4 border-blue-600">
            <h2 className="text-lg font-bold text-gray-800">Product Purchase Request</h2>
            <p className="text-xl font-semibold text-blue-700">{product}</p>
          </div>
          <DialogTitle className="font-serif text-lg text-gray-900">
            Secure Your Product Now!
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 italic">
            Provide your details, and our team will contact you shortly to complete your order.
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 space-y-3">
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}

          />
          <Button className="w-full mt-2 bg-blue-600 text-white" onClick={handleSubmit} disabled={isLoading ? true : false}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
type FormType={
  name:string;
  product:string;
  mobile:string;
  serviceRequest:boolean
}
export default Products
