
export const getStartups = async (query:string|undefined)=>
{
  if(query !== undefined)
  {
    const response = await fetch(`http://localhost:4000/api/startup/search/?query=${query}`)
    if(!response.ok)
    {
        await response.json()
        throw new Error(`Something went wrong! ${response.status} ${response.statusText}`)
    }
    const postData:Promise<{success:boolean,data:Startup[]}> =  response.json()
    const data = (await postData).data
    return data
  }

  const response = await fetch('http://localhost:4000/api/startup/all',{next:{revalidate:20}})
  if(!response.ok)
  {
    throw new Error(`Something went wrong! ${response.status} ${response.statusText}`)
  }
  const postData:Promise<{success:boolean,data:Startup[]}> =  response.json()
  const data = (await postData).data
  return data
}

export const getStartup = async (id:string)=>
  {
    const response = await fetch(`http://localhost:4000/api/startup/${id}`)
    if(!response.status)
    {
      return {success:false,data:undefined}
    }

    const postData:Promise<{success:boolean,data:Startup}> =  response.json()
    const data = (await postData).data
    return {success:true,data:data}
  }
  
export const getViews = async (id:string)=>
  {
    const response = await fetch(`http://localhost:4000/api/startup/${id}`)
    if(!response.ok)
      {
        throw new Error(`Something went wrong! ${response.status} ${response.statusText}`)
      }
    const postData:Promise<{success:boolean,data:Startup}> =  response.json()
    const data = (await postData).data
    return data
  }

export const updateViews = async (id:string)=>
  {
    const response = await fetch(`http://localhost:4000/api/startup/views/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      }})

    if(!response.ok)
    {
      throw new Error(`Something went wrong! ${response.status} ${response.statusText}`)
    }
    const postData:Promise<{success:boolean}> =  response.json()
    const data = (await postData)
    return data.success
  } 
