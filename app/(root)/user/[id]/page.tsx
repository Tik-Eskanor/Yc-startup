import { getAuthor } from '@/lib/resource/author-resource'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import { auth } from '@/auth'
import Image from 'next/image'
import UserStartups from '@/components/UserStartups'


type Param = 
{
  params:Promise<{id:string}>
}

export default async function page({params}:Param) {
  const id = (await params).id
  const res = await getAuthor(id)

  if(!res.success)
  {
    return notFound()
  }

  const user = res.data

  return (
   <div>
    <section className="pink-container pattern min-h-[230px]">
      <div className="max-w-[500px] mt-5 mb-3 px-4 py-1 mx-auto bg-white border-3 text-lg font-bold border-black rounded-md">
        {user?.name}
      </div>
      <Image src={user?.image ?? ""} alt='' width={1000} height={1000} className=' max-w-[300px] h-[300px] mb-3 rounded-full border-3 border-black object-cover object-top'/>
      <div className="font-bold text-lg text-center text-white">@{user?.userName}</div>
      <div className="font-bold text-sm text-center text-white mb-5">@{user?.bio}</div>
    </section>

    
   <section className="container mx-auto mt-10 px-4 md:px-0">
    <p className="font-semibold text-2xl">
      Your StartUps
    </p>

  <Suspense fallback={<p>Loading.....</p>}>
    <UserStartups id={id}/>
  </Suspense>

   </section>
  </div>
  )
}
