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
import type { Provider } from '@/services/service-providers'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input'
import { toast } from "sonner";
import { z } from "zod";
import { sendEmail } from '@/lib/email'
import { motion } from 'framer-motion'


const providerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    service: z.string().min(3, "Service type must be at least 3 characters"),
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

function ServiceProviders({ serviceproviders }: { serviceproviders: Provider[] }) {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
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
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormType>({ name: '', mobile: '', service, serviceRequest: true });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async() => {
    try{
      setIsLoading(true);
      const result= providerSchema.safeParse(formData);
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
      setFormData({ name: '', mobile: '', service, serviceRequest: true });
      setOpen(false);

    }finally{
      setIsLoading(false);
    }
  }
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
    transition={{ duration: 0.3 }}
    className="relative"
    style={{ pointerEvents: "none" }}
  >
    <motion.div
      animate={{ scale: [1, 1.01, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0"
    />

    <Card className='w-auto h-auto'>
      <CardHeader>
        <CardTitle>{service}</CardTitle>
      </CardHeader>
      <CardContent className='pt-3'>
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-md"
        >
          <Image src={image || '/home-page-img3.png'} alt='..' width={600} height={600} className='w-full h-full object-cover rounded-sm' />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4"
        >
          <div className='grid grid-cols-2 gap-2'>
            <Label className='font-medium'>Provider Name</Label>
            <Label>: {name}</Label>
            <Label className='font-medium'>Mobile</Label>
            <div className="flex items-center gap-1">
              {isSubscribed ? <Label>: {mobile}</Label> : <Label>: **********</Label>}
              {!isSubscribed && <Lock size={14} className="text-gray-500" />}
            </div>
          </div>
        </motion.div>
        {!isSubscribed && (
          <p className="text-xs text-red-500 mt-2">Subscribe to view Mobile Number</p>
        )}
        <StarRating rating={rating} />
        <Button className='bg-blue-700 mt-4 hover:bg-blue-800' onClick={() => { setOpen(true) }} style={{ pointerEvents: "auto" }}>Connect With Provider</Button>
        <ProviderDialog formData={formData} service={service} isLoading={isLoading} open={open} setOpen={setOpen} setFormData={setFormData} handleSubmit={handleSubmit} />
      </CardContent>
    </Card>
  </motion.div>
  )
}

const ProviderDialog = ({ open, setOpen, formData, setFormData, isLoading, handleSubmit, service }: { open: boolean, service: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, formData: FormType, setFormData: React.Dispatch<React.SetStateAction<FormType>>, isLoading: boolean, handleSubmit: () => void }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <div className="bg-gray-100 p-3 rounded-md border-l-4 border-blue-600">
            <h2 className="text-lg font-bold text-gray-800">Service Request</h2>
            <p className="text-xl font-semibold text-blue-700">{service}</p>
          </div>
          <DialogTitle className="font-serif text-lg text-gray-900">
            Connect with a Trusted Provider
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 italic">
            Fill in your details, and our team will reach out to you shortly to assist with your service request.
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

type FormType = {
  name: string;
  mobile: string;
  service: string;
  serviceRequest: boolean;
}
export default ServiceProviders
