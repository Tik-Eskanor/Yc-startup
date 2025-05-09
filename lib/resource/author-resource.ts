
export const getAuthor= async (id:string)=>
{
  const response = await fetch(`http://localhost:4000/api/author/${id}`)
  if(!response.status)
  {
    return {success:false,data:undefined}
  }
  const postData:Promise<{success:boolean,data:Author}> =  response.json()
  const data = (await postData).data
  return {success:true,data}
}

export const getAuthorStartups = async (id:strimg)=>
{
  const response = await fetch(`http://localhost:4000/api/author/startups/${id}`)
  if(!response.status)
  {
    return {success:false,data:undefined}
  }

  const postData:Promise<{success:boolean,data:Startup[]}> =  response.json()
  const data = (await postData).data
  return {success:true,data}
}
    