"use client"
import Link from "next/link"
import { X } from "lucide-react"

const reset = ()=>{
    const form = document.querySelector('.search-form') as HTMLFormElement
    if(form) form.reset()
  }

function SearchFormReset() {
  return (
    <button type='reset' onClick={reset}>
       <Link href="/" className='search-btn'><X className="size-5"/></Link>
    </button>
  )
}

export default SearchFormReset
