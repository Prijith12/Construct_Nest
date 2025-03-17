  "use client"
  import React from 'react'
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
  import { Button } from "@/components/ui/button";
  import { useRouter } from "next/navigation";
  import { ShieldX } from "lucide-react";

  function Error({ params }: { params: { errMessage: string } }) {
    let err;
    if (!params.errMessage || params.errMessage == 'undefined' || params.errMessage == 'null') {
      err = '500- Server Error'
    } else {
      err = params.errMessage
    }

    if(params.errMessage=='unauthorized'){
      const router = useRouter();

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          <Alert className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center gap-4">
              <ShieldX className="text-red-500 w-8 h-8" />
              <div>
                <AlertTitle className="text-xl font-semibold">403 Forbidden</AlertTitle>
                <AlertDescription className="mt-2 text-gray-600">
                  You do not have the necessary permissions to access this page.
                </AlertDescription>
              </div>
            </div>
            <Button 
              onClick={() => router.push("/")}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white">
              Go to Home
            </Button>
          </Alert>
        </div>
      )
    }

    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-lg font-serif font-bold px-14'>
          <h1>Something went wrong: <span className='text-red-700'>{err}</span> </h1>
        </div>
      </div>
    )
  }

  export default Error
