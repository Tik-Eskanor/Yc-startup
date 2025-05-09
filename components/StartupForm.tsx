"use client"

import { useActionState, useState } from "react"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import MDEditor from '@uiw/react-md-editor';
import { Button } from "../components/ui/button";
import { Send } from "lucide-react";
import { createStartup } from "@/lib/resource/pr-create-startup"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function StartupForm() {

  const { data: session} = useSession();
  const router = useRouter()

  const [state, formAction,isPending] = useActionState(createStartup,null)
  
  const [pitch, setPitch] =  useState("");

  if(state?.success)
  {
    router.push(`/startup/${state?.res?._id}`)
  }
  
  return (
    <div className="w-full md:w-8/12 mx-auto mt-5">
      <form action={formAction} className="p-3">
      <div className="mb-3">
        <label htmlFor="title" className="font-bold mb-2 block">TITLE</label>
        <Input type="text" id="title" name="title" placeholder="Startup title"  className="border-2 rounded-full border-black p-5 w-full required"/>
        {state?.fieldErrors?.title && <p>{state.fieldErrors?.title}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="font-bold mb-2 block">DESCRIPTION</label>
        <Textarea  id="description" name="description" placeholder="Startup description"  className="border-2 rounded-xl border-black p-5 w-full required"/>
        {state?.fieldErrors?.description && <p>{state.fieldErrors?.description}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="font-bold mb-2 block">CATEGORY</label>
        <Input type="text" id="category" name="category" placeholder="Choose a category eg(Health, Education, Tech) etc"  className="border-2 rounded-full border-black p-5 w-full required"/>
        {state?.fieldErrors?.category && <p>{state.fieldErrors?.category}</p>}
      </div>

      <div  className="mb-3">
        <label htmlFor="image" className="font-bold mb-2 block">IMAGE URL</label>
        <Input type="text" id="image" name="image" placeholder="Post a link to your demo or potential media"  className="border-2 rounded-full border-black p-5 w-full required"/>
        {state?.fieldErrors?.image && <p>{state.fieldErrors?.image}</p>}
        <input type="hidden" name="token" value={session?.sessionToken} />
        <input type="hidden" name="id" value={session?.user?.email?.toString()} />
        <input type="hidden" name="pitch" value={pitch} />
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="font-bold mb-2 block">PITCH</label>
        <MDEditor
         value={pitch}
         onChange={(value)=> setPitch(value as string)}
         id="pitch"
         preview="edit"
         height={250}
         style={{borderRadius:'15px',overflow:'hidden'}}
         textareaProps={{
          placeholder:'Briefly describe your idea and what problem it solves'
         }}
        />
        {state?.fieldErrors?.pitch && <p>{state.fieldErrors?.pitch}</p>}
      </div>

      <Button type="submit" disabled={isPending} className="border-2 w-full rounded-full border-black bg-gray-600 font-semibold  text-white p-6 mt-4">
        {isPending ? "Submiting...": "Submit your pitch"}<Send size={6}/>
      </Button>
      </form>
    </div>
   
  )
}
