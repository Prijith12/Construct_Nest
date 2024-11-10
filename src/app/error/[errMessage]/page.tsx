import React from 'react'

function Error({ params }: { params: { errMessage: string } }) {
  let err;
  if (!params.errMessage || params.errMessage == 'undefined' || params.errMessage == 'null') {
    err = '500- Server Error'
  } else {
    err = params.errMessage
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
