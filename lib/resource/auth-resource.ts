export const logIn = async (email:string|null|undefined)=>
    {
        const response = await fetch(`https://yc-startup-express-backend.onrender.com/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
              })})

      if(!response.ok)
      { 
        if(response.status == 404)
        {
          return {success:false,accessToken:""}
        }
        else
        {
          throw new Error(`Something went wrong with response`)
        }
      }
      const postData:Promise<{success:boolean,accessToken:string}> =  response.json()
      const data = (await postData)
      return data
    }

    export const signup = async (userData:Author)=>
      {
          const response = await fetch(`https://yc-startup-express-backend.onrender.com/api/auth/signup`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ...userData
                })})

        if(!response.ok)
        { 
          throw new Error(`Something went wrong with response`)
        }
        const postData:Promise<{success:boolean,accessToken:string}> =  response.json()
        const data = (await postData)
        return data
      }