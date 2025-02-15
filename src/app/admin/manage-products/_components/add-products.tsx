"use client"
import React, { SetStateAction, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { baseUrl } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { addRegion } from '@/services/regions'
import { Product } from '../page'
import z from 'zod'
import Image from 'next/image'
import { DropDown } from '@/components/drop-down'
import { addProduct } from '@/services/products'
import { AlertDialogCom } from '@/components/alert-dialog'
import { apiRequest } from '@/lib/api'
import { log } from 'console'



const productSchema=z.object({
  name:z.string().min(1,{message:"Name is Required"}),
  price:z.number({message:"Price is required"}).min(1,{message:"Price is required"}).nonnegative({message:"Price must be non negative value"}),
  rating:z.number().min(1).max(5),
  unit:z.string().max(16,{message:"Unit detials can't exceed 8 characters"})
});

function AddProduct() {
const [product, setProduct] = useState<Product>({name:'',price:0,rating:5,image:'',unit:''});
const [file,setFile]=useState<File|null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [alertDialogOpen,setAltDialogOpen]=useState<boolean>(false);
  const [errors, setErrors] = useState<z.ZodIssue[]|[{message:string}]>([]);
  const queryClient=useQueryClient();
  const router = useRouter();
  let appendFile:any;


  const handleFormUpload=async()=>{
    const response=await apiRequest({url:'/api/file-upload',method:'POST',body:appendFile});
    const updatedProduct={...product,image:response.fileName};
    await addProduct(updatedProduct);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return handleFormUpload()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['products']})
      setProduct({name:'',price:0,rating:5,image:'',unit:''});
      setDialogOpen(false);
    },
    onError: (e) => {
      router.push(`/error/${e}`);
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validate=productSchema.safeParse(product);
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
    <div>
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className='mt-6 md:mt-1'>Add New Product</Button>
      </DialogTrigger>
      <DialogContent className='max-w-full md:max-w-[460px] rounded'>
        <DialogHeader>
          <DialogTitle className=' font-serif'>Add Product</DialogTitle>
        </DialogHeader>
        <div>
          <AddProductForm handleSubmit={handleSubmit} setProduct={setProduct} product={product} loading={isPending} setFile={setFile}/>
        </div>
      </DialogContent>
    </Dialog>
    <AlertDialogCom alertDialogOpen={alertDialogOpen} setAltDialogOpen={setAltDialogOpen} errors={errors}/>
    </div>
  )
}

const AddProductForm = ({ handleSubmit, setProduct, product, loading,setFile }: { handleSubmit: (e: React.FormEvent) => void, setProduct: React.Dispatch<React.SetStateAction<Product>>, product: Product, loading: boolean,setFile:React.Dispatch<React.SetStateAction<File|null>> }) => {
  const [imagePreview,setImagePreview]=useState<string|null>(null);
  const ratingValues=['1','2','3','4','5'];
    const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const file=e.target.files?.[0];
      if(file){
       setFile(file);
        setImagePreview(URL.createObjectURL(file));  
      }
  
    }
  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <Input type='text' placeholder='Product Name' value={product.name} onChange={(e) => setProduct({...product,name:e.target.value})} disabled={loading} />
        <Input type='number' placeholder='Price' value={product.price==0?'':product.price} onChange={(e) => setProduct({...product,price:parseInt(e.target.value)})} disabled={loading} />
        <Input type='string' placeholder='Unit' value={product.unit||''} onChange={(e) => setProduct({...product,unit:e.target.value})} disabled={loading} />
        <Input type='file' onChange={handleFileChange}></Input>
        {imagePreview &&
                <div className='w-24 h-20 overflow-hidden'>  
                  <Image alt='not found..' src={imagePreview} height={100} width={100}/>
                </div>
                }
        <DropDown label='Rating' placeholder='Select Rating' ratingValues={ratingValues} onChange={(value)=>setProduct({...product,rating:parseInt(value)})}/>     
        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>{loading ? 'Adding...' : 'Submit'}</Button>
        </div>
      </div>
    </form>
  )
}

export default AddProduct
