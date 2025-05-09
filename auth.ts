import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { logIn, signup } from "./lib/resource/auth-resource";
import jwt from 'jsonwebtoken';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({user,profile}) {
    try {

      // Send user data to your backend
      const response = await logIn(user.email)
      if(response.success)
      {
          // // Get and decode the JWT token
          const userData = jwt.verify(response.accessToken,process.env.JWT_SECRET_KEY)
          user.name =  userData.name
          user.email = userData.userId
          user.image = userData.image
          user.id =    response.accessToken
      }
      else
      {
       const result = await signup({id:profile?.id,name:user.name,userName:user.name,email:user.email,image:user.image,bio:profile?.profile})
       if(result)
       {
         const response = await logIn(user.email)
         if(response.success)
          {
            const userData = jwt.verify(response.accessToken,process.env.JWT_SECRET_KEY)
            user.name = userData.name
            user.email = userData.email
            user.image = userData.image
            user.id = response.accessToken
          }
       }
      }
      return true;

    } catch (error) {
      console.error("Error in signIn callback:", error);
      return false;
    }
  },

  async session({ session,  token }) {
    // Send properties to the client, like an access_token and user id from a provider.
    session.sessionToken = token.sub
    return session
  }
  }
  
})