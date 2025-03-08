import React from 'react'
import { useParams } from 'react-router-dom'

const SomethingWentWrong = () => {
  const {errrorMessage, status } = useParams()
  return (
    <div className="flex w-full h-full bg-black/90 items-center justify-center">
<p className='text-white/80 text-2xl'>
{
  errrorMessage || "Something Went Wrong" 
}
</p>
<p className='text-white/80 text-2xl'>
{
  status ? "With the status code of " + status : " " 
}
</p>

    </div >
  )
}

export default SomethingWentWrong