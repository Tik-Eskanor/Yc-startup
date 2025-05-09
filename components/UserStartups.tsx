import { getAuthorStartups } from '@/lib/resource/author-resource'
import { notFound } from 'next/navigation'
import React from 'react'
import StartupCard from './StartupCard'

export default async function UserStartups({id}:{id:string}) {
    const res = await getAuthorStartups(id)
    if(!res.success)
    {
      return notFound()
    }
    const posts = res.data

  return (
    <div>
    <ul className="mt-7 flex flex-wrap gap-10">
      {posts != undefined && posts.length > 0  ? (posts?.map((post)=>(
        <StartupCard key={post._id} post={post}/>
      ))):
      (<p>No Startup</p>)}
    </ul>
    </div>
  )
}
