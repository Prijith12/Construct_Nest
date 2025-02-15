"use client"
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertDialogCom } from '@/components/alert-dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { Providers } from './providers-table'
import Image from 'next/image'
import { apiRequest } from '@/lib/api'
import { addServiceProvider } from '@/services/service-providers'



type AddProviders = Omit<Providers, 'id'> & { id?: number}

const providerSchema=z.object({
  name:z.string().min(1,{message:"Name is required"}),
  service:z.string().min(1,{message:"Service is required"}),
  mobile:z.string().regex(/^\d{10}$/,{message:"Mobile number is not valid or missing"}),
  });

function AddProviders() {
  const [dialog, setDialogOpen] = useState<{dialogOpen:boolean}>({dialogOpen:false});
  const [alertDialogOpen,setAltDialogOpen]=useState<boolean>(false);
  const [errors, setErrors] = useState<z.ZodIssue[]|[{message:string}]>([]);
  const [provider, setProvider] = useState<AddProviders>({ name: '', service: '', mobile: '',image:'', rating: 5 });
  const [file,setFile]=useState<File|null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  let appendFile:any;

  const handleFormUpload=async()=>{
    const response=await apiRequest({url:'/api/file-upload',method:'POST',body:appendFile});
    const updatedProvider = { ...provider, image: response?.fileName };
    await addServiceProvider(updatedProvider);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return handleFormUpload();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-providers'] });
      setProvider({ name: '', service: '', mobile: '',image:'',rating: 5 });
      setDialogOpen({dialogOpen:false});
    },
    onError: (e) => {
      router.push(`/error/${e}`);
    }
  }) 

  const handleSubmit =async(e:React.FormEvent) => {
    e.preventDefault()
    const validate= providerSchema.safeParse(provider);
    if(!validate.success){
      setErrors(validate.error.errors);
      setAltDialogOpen(true);
      return;
    }
    if(!file){
      setErrors([{message:'Image is Required'}]);
      setAltDialogOpen(true);
      return;
    }
    appendFile=new FormData();
    appendFile.append('file',file);    
    mutate();
  }


  return (
    <>
    <Dialog open={dialog.dialogOpen} onOpenChange={(open)=>setDialogOpen({dialogOpen:open})}>
      <DialogTrigger asChild>
        <Button variant="default" className='mt-6 md:mt-1'>Add New Service Provider</Button>
      </DialogTrigger>
      <DialogContent className='max-w-full md:max-w-[460px] rounded'>
        <DialogHeader>
          <DialogTitle className=' font-serif'>Add Service Provider</DialogTitle>
        </DialogHeader>
        <div>
          <AddProvidersForm handleSubmit={handleSubmit} setProvider={setProvider} provider={provider} loading={isPending} setFile={setFile}/>
        </div>
      </DialogContent>
    </Dialog>
    <AlertDialogCom alertDialogOpen={alertDialogOpen} setAltDialogOpen={setAltDialogOpen} errors={errors}/>
    </>
  )
}

const AddProvidersForm = ({ handleSubmit, setProvider, provider, loading,setFile }: { handleSubmit: (e: React.FormEvent) => void, setProvider: React.Dispatch<React.SetStateAction<AddProviders>>, provider: AddProviders, loading: boolean,setFile:React.Dispatch<React.SetStateAction<any>> }) => {
  const [imagePreview,setImagePreview]=useState<string|null>(null);
  const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0];
    if(file){
     setFile(file);
      setImagePreview(URL.createObjectURL(file));  
    }

  }
  
  const ratingValues=['1','2','3','4','5'];
  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <Input type='text' placeholder='Provider Name' value={provider.name} onChange={(e) => setProvider({ ...provider, name: e.target.value })} disabled={loading} />
        <Input type='text' placeholder='Service Name' value={provider.service} onChange={(e) => { setProvider({ ...provider, service: e.target.value }) }} disabled={loading} />
        <Input type='number' placeholder='Mobile Number' value={provider.mobile} onChange={(e) => { setProvider({ ...provider, mobile: e.target.value }) }} disabled={loading} />
        <Input type='file' onChange={handleFileChange}/>
        {imagePreview &&
        <div className='w-24 h-20 overflow-hidden'>  
          <Image alt='not found..' src={imagePreview} height={100} width={100}/>
        </div>
}
        <Select onValueChange={(value)=>{setProvider({...provider,rating:parseInt(value)})}}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rating</SelectLabel>
              {
                ratingValues.map((value)=>(
                  <SelectItem value={`${value}`}>{value}</SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>{loading ? 'Adding...' : 'Submit'}</Button>
        </div>
    </form>
  )
}



export default AddProviders
