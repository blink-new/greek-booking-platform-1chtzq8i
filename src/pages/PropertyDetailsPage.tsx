import { useParams } from 'react-router-dom'
import Header from '../components/Header'

export default function PropertyDetailsPage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Property Details</h1>
          <p className="text-gray-600">
            Detailed property view for property ID: {id}
          </p>
          <p className="text-gray-600 mt-2">
            Property gallery, amenities, reviews, and booking options coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}