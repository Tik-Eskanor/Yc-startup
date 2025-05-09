
import Views from "@/components/Views"
import {getStartup,updateViews} from "@/lib/resource/post-resource"
import { formatDate } from '@/lib/utils'
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"


type Param = 
{
  params:Promise<{id:string}>
}

export default async function page({params}:Param) {
   const id = (await params).id
   const res = await getStartup(id)

    if(!res.success)
    {
      return notFound
    }

   const post = res.data
   await updateViews(id);

  return (
    <div>
      <section className="pink-container pattern min-h-[230px]">
        <p className="bg-secondary px-4 py-1 rounded font-bold">{formatDate(post?.createdAt || "")}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading px-3">{post?.description}</p>
      </section>

      <section className="container mx-auto mt-10 px-4 md:px-0">

         <div className="max-w-4xl mx-auto">
         <Image src={post?.image || ""} width={1000} height={1000} alt="" className="w-full rounded-2xl"/>

          <div className="flex justify-between items-center mt-10 ">
            <Link href={`/user/${post?.author._id}`} className="flex gap-2 items-center mb-3">
              <Image src={post?.author.image || ""} alt="" width={68} height={68} className="rounded-full drop-shadow-lg" />
              <div>
                <p className="font-semibold text-sm">{post?.author.name}</p>
                <p className="font-semibold text-sm text-black-300">{post?.author.userName}</p>
              </div>
            </Link>
            <p className="bg-gray-200 shadow-sm px-3 py-1 rounded-xl flex justify-center items-center">{post?.category}</p>
          </div>
          <h3 className="mt-5 font-bold text-3xl">Pitch Details</h3>
          <div>{post?.pitch}</div>
         </div>

         <hr className="max-w-4xl mx-auto my-3 text-gray-200" />
         {/* TO do */}
         <Views id={post?._id || ""}/>
      </section>
    </div>

  )
}

