import React from 'react'
import Link from 'next/link'
import { auth,signIn,signOut } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LucideLogOut, PlusCircle } from 'lucide-react';

 const Navbar = async ()=>
 {
    const session = await auth();
    return (
      <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className="flex justify-between items-center">
          <Link href="/">
            <div className="text-xl font-bold"><i><sup>YC</sup>StartUp</i> </div>
          </Link>
  
          <div className="flex items-center gap-5 text-black">
             {session ? (
                <>
                 <Link href="/startup/create">
                  <span className='hidden md:block'>Create</span>
                  <PlusCircle className=' md:hidden'/>
                 </Link>

                 <form action={async ()=>{
                    "use server";
                    await signOut({redirectTo:'/'})
                 }}>
                    <button type='submit'>
                    <span className='hidden md:block'>Logout</span>
                     <LucideLogOut className=' md:hidden'/>
                    </button>
                 </form>

                 <Link href={`/user/${session.user?.email}`}>
                 {/* <Avatar className="size-10">
                  <AvatarImage src={session.user?.image} alt="" />
                  <AvatarFallback>
                    AV
                  </AvatarFallback>
                 </Avatar> */}
                  {session.user?.name}
                 </Link>
                </>
             ):(<form
                action={async () => {
                  "use server"
                  await signIn("github")
                }} >
                <button type="submit">Login</button>
              </form>)
             }
          </div>
        </nav>
      </header>
    )
 }

export default Navbar
