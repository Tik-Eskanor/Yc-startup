import React from 'react'
import Ping from './Ping'
import {getViews} from "@/lib/resource/post-resource"


export default async function Views({id}:{id:string}) {
  
  const {views}= await getViews(id)

  return ( 
    <div className='fixed right-10 bottom-3 bg-gray-100 shadow-md  rounded-lg py-2 px-4'>
        <div className="absolute -right-2 -top-2">
         <Ping/>
        </div>
        <div className='text-sm font-bold'>
         <p>Views:{views}</p>
        </div>
    </div>

  )
}
