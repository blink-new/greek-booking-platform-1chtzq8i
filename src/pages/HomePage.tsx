import { useState, useEffect } from 'react'
import Header from '../components/Header'
import SearchForm from '../components/SearchForm'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Star, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react'

// Mock data for Greek destinations and properties
const featuredDestinations = [
  {
    id: 1,
    name: 'Santorini',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
    properties: 1247,
    description: 'Famous for stunning sunsets and white-washed buildings'
  },
  {
    id: 2,
    name: 'Mykonos',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
    properties: 892,
    description: 'Vibrant nightlife and beautiful beaches'
  },
  {
    id: 3,
    name: 'Athens',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop',
    properties: 2156,
    description: 'Ancient history meets modern culture'
  },
  {
    id: 4,
    name: 'Crete',
    image: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?w=800&h=600&fit=crop',
    properties: 1834,
    description: 'Largest Greek island with diverse landscapes'
  },
  {
    id: 5,
    name: 'Rhodes',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop',
    properties: 743,
    description: 'Medieval charm and crystal-clear waters'
  },
  {
    id: 6,
    name: 'Corfu',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    properties: 567,
    description: 'Lush green landscapes and Venetian architecture'
  }
]

const featuredProperties = [
  {
    id: 1,
    name: 'Luxury Villa with Infinity Pool',
    location: 'Santorini, Cyclades',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    rating: 9.4,
    reviews: 127,
    price: 450,
    originalPrice: 520,
    amenities: ['Wifi', 'Pool', 'Sea View', 'Parking'],
    badge: 'Genius'
  },
  {
    id: 2,
    name: 'Boutique Hotel in Old Town',
    location: 'Rhodes, Dodecanese',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    rating: 8.9,
    reviews: 234,
    price: 180,
    originalPrice: null,
    amenities: ['Wifi', 'Breakfast', 'AC', 'Historic'],
    badge: null
  },
  {
    id: 3,
    name: 'Beachfront Resort & Spa',
    location: 'Mykonos, Cyclades',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    rating: 9.1,
    reviews: 89,
    price: 320,
    originalPrice: 380,
    amenities: ['Spa', 'Beach', 'Restaurant', 'Gym'],
    badge: 'Preferred'
  }
]

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const heroImages = [
    'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1920&h=1080&fit=crop'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Greece
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              From ancient Athens to stunning islands, find your perfect Greek getaway
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto w-full">
            <SearchForm variant="hero" />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <MapPin className="h-6 w-6 mb-1" />
              <span className="text-sm">Hotels</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Waves className="h-6 w-6 mb-1" />
              <span className="text-sm">Beach Resorts</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Coffee className="h-6 w-6 mb-1" />
              <span className="text-sm">City Breaks</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Car className="h-6 w-6 mb-1" />
              <span className="text-sm">Car Rentals</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Popular destinations in Greece
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.properties} properties</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600">{destination.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured properties
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  {property.badge && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      {property.badge}
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg leading-tight">{property.name}</h3>
                    <div className="flex items-center ml-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{property.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {property.reviews} reviews
                    </div>
                    <div className="text-right">
                      {property.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          €{property.originalPrice}
                        </div>
                      )}
                      <div className="text-lg font-bold">
                        €{property.price}
                        <span className="text-sm font-normal text-gray-500">/night</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003580] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Greek Booking</h3>
              <p className="text-blue-200">
                Your gateway to discovering the beauty of Greece. From ancient ruins to pristine beaches.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white">Athens</a></li>
                <li><a href="#" className="hover:text-white">Santorini</a></li>
                <li><a href="#" className="hover:text-white">Mykonos</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 Greek Booking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}