import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'

async function SearchForm({query}:{query?:string}) {

  return (
    <Form action="/" scroll={false} className='search-form mb-5 md:mb-0'>
      <input name='query'
             className='flex-1 border-0 py-1 focus:outline-0'
             placeholder='Search startus'
             defaultValue={query}
              />
    <div className="flex gap-2">
        {query && (
           <SearchFormReset/>
        )}
        <button type='submit' className='search-btn'>
            <Search className='size-5'/>
        </button>
    </div>
    </Form>
  )
}

export default SearchForm
