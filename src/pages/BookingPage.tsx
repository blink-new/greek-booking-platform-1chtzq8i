import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Calendar, Users, MapPin, Star, CreditCard, User, MessageSquare, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { blink } from '@/blink/client'
import { format, differenceInDays } from 'date-fns'

interface Property {
  id: string
  name: string
  location: string
  price_per_night: number
  images: string[]
  rating: number
  review_count: number
}

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState<Property | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingId, setBookingId] = useState('')

  // Form data
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  const propertyId = searchParams.get('propertyId') || ''
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const guests = parseInt(searchParams.get('guests') || '2')
  const total = parseFloat(searchParams.get('total') || '0')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      if (state.user) {
        setGuestName(state.user.displayName || '')
        setGuestEmail(state.user.email || '')
      }
    })
    return unsubscribe
  }, [])

  const loadProperty = useCallback(async () => {
    try {
      setLoading(true)
      const result = await blink.db.properties.list({
        where: { id: propertyId, is_active: "1" }
      })

      if (result.length > 0) {
        const prop = result[0]
        setProperty({
          ...prop,
          images: JSON.parse(prop.images || '[]'),
          rating: parseFloat(prop.rating || '0'),
          price_per_night: parseFloat(prop.price_per_night || '0')
        })
      }
    } catch (error) {
      console.error('Error loading property:', error)
    } finally {
      setLoading(false)
    }
  }, [propertyId])

  useEffect(() => {
    if (propertyId) {
      loadProperty()
    }
  }, [propertyId, loadProperty])

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1
    return Math.max(1, differenceInDays(new Date(checkOut), new Date(checkIn)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      blink.auth.login()
      return
    }

    if (!guestName || !guestEmail) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setSubmitting(true)
      
      // Generate booking ID
      const newBookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Create booking record
      await blink.db.bookings.create({
        id: newBookingId,
        userId: user.id,
        propertyId: propertyId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guests: guests,
        totalPrice: total,
        currency: 'EUR',
        guestName: guestName,
        guestEmail: guestEmail,
        guestPhone: guestPhone || '',
        specialRequests: specialRequests || '',
        bookingStatus: 'confirmed',
        paymentStatus: 'paid'
      })

      setBookingId(newBookingId)
      setBookingComplete(true)
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Sign in required</h1>
              <p className="text-gray-600 mb-6">
                You need to be signed in to make a booking
              </p>
              <Button onClick={() => blink.auth.login()}>
                Sign in to continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="bg-white rounded-lg h-32"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg h-96"></div>
              <div className="bg-white rounded-lg h-96"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-gray-600 mb-6">
                Your booking has been successfully confirmed. You will receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-4">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-mono">{bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Property:</span>
                    <span>{property?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{format(new Date(checkIn), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{format(new Date(checkOut), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{guests}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>€{total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  Back to Home
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/search')}
                  className="w-full"
                >
                  Search More Properties
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Property not found</h1>
              <Button onClick={() => navigate('/search')}>
                Back to Search
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const nights = calculateNights()

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="guestName">Full Name *</Label>
                      <Input
                        id="guestName"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="guestEmail">Email Address *</Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="guestPhone">Phone Number</Label>
                      <Input
                        id="guestPhone"
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any special requests or requirements..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <Separator />

                  <Alert>
                    <CreditCard className="h-4 w-4" />
                    <AlertDescription>
                      This is a demo booking platform. No actual payment will be processed.
                    </AlertDescription>
                  </Alert>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Info */}
                <div className="flex space-x-4">
                  <img
                    src={property.images[0] || '/placeholder.jpg'}
                    alt={property.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{property.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{property.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">
                        ({property.review_count} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Booking Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Check-in</span>
                    </div>
                    <span className="font-medium">
                      {format(new Date(checkIn), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Check-out</span>
                    </div>
                    <span className="font-medium">
                      {format(new Date(checkOut), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Guests</span>
                    </div>
                    <span className="font-medium">{guests}</span>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>€{property.price_per_night} × {nights} nights</span>
                    <span>€{total}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>€{total}</span>
                  </div>
                </div>

                <Alert>
                  <MessageSquare className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Free cancellation until 24 hours before check-in
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}