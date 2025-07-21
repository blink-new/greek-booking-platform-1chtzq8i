import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import SearchForm from '../components/SearchForm'

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const destination = searchParams.get('destination') || ''

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Form */}
        <div className="mb-6">
          <SearchForm variant="compact" />
        </div>
        
        {/* Results Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {destination ? `Properties in ${destination}` : 'Search Results'}
          </h1>
          <p className="text-gray-600 mt-1">
            Found 1,247 properties
          </p>
        </div>
        
        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Search Results Coming Soon</h2>
          <p className="text-gray-600">
            Property listings, filters, and detailed search results will be implemented next.
          </p>
        </div>
      </div>
    </div>
  )
}