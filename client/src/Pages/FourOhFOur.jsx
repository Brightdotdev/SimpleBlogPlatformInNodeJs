import React from 'react'
import { Link } from 'react-router-dom'

const FourOhFour = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center w-screen h-screen text-white/90 bg-black/80'>
      <p>
      Looking for this page?....me tooo
      </p>



<div className="flex items-center justify-center rounded-sm bg-black/70 px-4 py-2 duration-300
 cursor-pointer hover:bg-green-500 text-white">
            <Link to="/">
    Lets go back home shall we
            </Link>
            </div>
        </div>
  )
}

export default FourOhFour