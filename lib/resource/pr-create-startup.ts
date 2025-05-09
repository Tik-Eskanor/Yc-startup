"use server"

import z from "zod"
import { StartupFormSchema } from "../validation/startupFormSchema"
export const createStartup = async(prevState:unknown, formData:FormData)=>{

    try {
        const formValues = {
          title: formData?.get('title'),
          author: formData?.get('id')?.toString(),
          description: formData?.get('description'),
          category: formData?.get('category'),
          image: formData?.get('image'),
          pitch:formData?.get('pitch'),
        }
      const token = formData.get('token')
  
      const validatedData =  await StartupFormSchema.parseAsync(formValues)
      
      const response = await fetch("https://yc-startup-express-backend.onrender.com/api/startup/create",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(validatedData)
      })
  
      if(!response.ok)
      {
        throw new Error(`Something went wrong! ${response.status} ${response.statusText}`)
      }
      const postData:Promise<{success:boolean,data:Startup}> =  response.json()
      const data = (await postData).data

      return {success:true,res:data}
      
    }
  
    catch(error){
      if(error instanceof z.ZodError)
      {
        const fieldErrors = error.flatten().fieldErrors
        return {success:false,fieldErrors}
      }
      else
      {
        console.log("error from server "+error)
      }
    }
  }