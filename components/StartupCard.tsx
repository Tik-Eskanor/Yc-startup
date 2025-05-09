import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

function StartupCard({post}:{post:Startup}) {
  return (
    <li className='md:basis-[30%] basis-[100%] my-3 p-3 border-5 border-black rounded-2xl'>
       <div className="flex justify-between">
        <p className='text-sm text-gray-500'> {formatDate(post.createdAt)}</p>
        <div className="flex gap-1 5 items-center">
            <EyeIcon size={15} className='text-primary'/>
            <span className="text-xs font-bold">{post.views}</span>
        </div>
       </div>
       <div className="flex mt-5 gap-5">
          <div className="flex-1">
            <Link href={`/user/${post.author._id}`}>
              <p className='text-sm line-clamp-1 font-semibold'>{post.author.name}</p>
            </Link>
            <Link href={`/startup/${post._id}`}>
             <h3 className="font-bold text-lg line-clamp-1">{post.title}</h3>
            </Link>
          </div>
          <Link href={`/user/${post.author._id}`}>
          <Image src={post.author.image ?? ""} width={48} height={48} className='rounded-full' alt=''/>
          </Link>
       </div>
       <Link href={`/startup/${post._id}`}>
          <p className='text-gray-500'>{post.description}</p>
          <Image src={post.image} alt="" className='rounded-md mt-2 w-full h-52 object-cover' width={500} height={500} />
       </Link>
       
       <div className="flex justify-between mt-4 items-center">
         <Link href={`/?query=${post.category.toLowerCase()}`}>
          <p className='font-semibold'>{post.category}</p>
         </Link>
         <Button className='bg-black text-white rounded-full text-sm font-semibold !py-0 px-6' asChild>
           <Link href={`/startup/${post._id}`}>Details</Link>
         </Button>
       </div>

    </li>
  )
}

export default StartupCard
