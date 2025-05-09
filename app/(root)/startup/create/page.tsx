import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm"
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth()
  if(!session)
  {  return redirect('/')}

  return (
    <div>
      <section className="pink-container !min-h-[230px] pattern">
        <h1 className="heading">Submit your Startup</h1>
      </section>
      
      <StartupForm/>
    </div>
  )
}
 