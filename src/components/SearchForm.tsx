import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { 
  Search, 
  MapPin, 
  Calendar as CalendarIcon, 
  Users,
  Minus,
  Plus
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '../lib/utils'

interface SearchFormProps {
  variant?: 'hero' | 'compact'
}

export default function SearchForm({ variant = 'hero' }: SearchFormProps) {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  })
  const [showGuestPicker, setShowGuestPicker] = useState(false)

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      destination,
      checkIn: checkIn?.toISOString() || '',
      checkOut: checkOut?.toISOString() || '',
      adults: guests.adults.toString(),
      children: guests.children.toString(),
      rooms: guests.rooms.toString()
    })
    navigate(`/search?${searchParams.toString()}`)
  }

  const isHero = variant === 'hero'

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-lg border border-yellow-400",
      isHero ? "p-6" : "p-4"
    )}>
      <div className={cn(
        "grid gap-4",
        isHero ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      )}>
        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium">
            Where are you going?
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="destination"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Guests & rooms</Label>
          <Popover open={showGuestPicker} onOpenChange={setShowGuestPicker}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <Users className="mr-2 h-4 w-4" />
                {guests.adults + guests.children} guests, {guests.rooms} room{guests.rooms > 1 ? 's' : ''}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Adults</div>
                    <div className="text-sm text-gray-500">Ages 18 or above</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                      disabled={guests.adults <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{guests.adults}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Children</div>
                    <div className="text-sm text-gray-500">Ages 0-17</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                      disabled={guests.children <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{guests.children}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Rooms</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuests(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                      disabled={guests.rooms <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{guests.rooms}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuests(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => setShowGuestPicker(false)}
                >
                  Done
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Button */}
      <div className={cn("mt-4", isHero ? "text-center" : "")}>
        <Button 
          onClick={handleSearch}
          className={cn(
            "bg-[#0071c2] hover:bg-[#005999] text-white",
            isHero ? "px-12 py-3 text-lg" : "w-full"
          )}
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  )
}