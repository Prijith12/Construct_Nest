import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import z from 'zod'

export const AlertDialogCom=({alertDialogOpen,setAltDialogOpen,errors}:{alertDialogOpen:boolean,setAltDialogOpen:React.Dispatch<React.SetStateAction<boolean>>,errors:z.ZodIssue[]|[{message:string}]})=>{
    return(
      <AlertDialog open={alertDialogOpen} onOpenChange={(open)=>setAltDialogOpen(()=>(open))}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Validation Errors.</AlertDialogTitle>
        <AlertDialogDescription>
          <ul className='list-disc'>
          {
            errors.map((error,index)=>(
              <li className='text-red-600'key={index}>{error.message}</li>
            ))
          }
          </ul>
  
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
    )
  }