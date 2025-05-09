 import SearchForm from "../../components/SearchForm";
 import StartupCard from "@/components/StartupCard";
 import {getStartups} from "@/lib/resource/post-resource"

 type SearchParams = 
 {
   searchParams:Promise<{query?:string}>
 }

export default async function Home({searchParams}:SearchParams) {
   const query = (await searchParams).query
   const posts = await getStartups(query)
  return (
    <div>
       <section className="pink-container pattern">
         <div className="heading">pitch your startup <br/> connetc your Enterpreneurs</div>
         <p className="sub-heading px-3">Submit ideas, Vote Pitches and get noticed in Virtual Competitions</p>
         <SearchForm query={query}/>
       </section>


       <section className="container mx-auto mt-10 px-4 md:px-0">
        <p className="font-semibold text-lg">
           {query ? `Search results for ${query}`: "All startups"}
        </p>

        <ul className="mt-7 flex flex-wrap gap-10">
          {posts.length > 0 ? (posts.map((post)=>(
            <StartupCard key={post._id} post={post}/>
          ))):
          (<p>No results for Startup</p>)}
        </ul>
       </section>
    </div>
  );
}
