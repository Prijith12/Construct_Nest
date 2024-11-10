"use client"
import React, { useState } from 'react'
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


function AddRegions() {
  const [region, setRegion] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient=useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ region }: { region: string }) => {
      return addRegion({ region })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['regions']})
      setRegion('');
      setDialogOpen(false);
    },
    onError: (e) => {
      console.log("error in add region");
      
      router.push(`/error/${e}`);
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ region });

  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className='mt-6 md:mt-1'>Add New Region</Button>
      </DialogTrigger>
      <DialogContent className='max-w-full md:max-w-[460px] rounded'>
        <DialogHeader>
          <DialogTitle className=' font-serif'>Add Region</DialogTitle>
        </DialogHeader>
        <div>
          <AddRegionsForm handleSubmit={handleSubmit} setRegion={setRegion} region={region} loading={isPending} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

const AddRegionsForm = ({ handleSubmit, setRegion, region, loading }: { handleSubmit: (e: React.FormEvent) => void, setRegion: React.Dispatch<React.SetStateAction<string>>, region: string, loading: boolean }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input type='text' placeholder='Region' value={region} onChange={(e) => setRegion(e.target.value)} disabled={loading} />
        <div className='flex justify-end mt-3'>
          <Button type='submit' disabled={loading}>{loading ? 'Adding...' : 'Submit'}</Button>
        </div>
      </div>
    </form>
  )
}



export default AddRegions
