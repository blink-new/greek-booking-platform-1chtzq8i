import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { 
  Search, 
  Menu, 
  User, 
  Globe,
  Heart,
  MapPin
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#003580] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white text-[#003580] px-3 py-1 rounded font-bold text-xl">
              Greek
            </div>
            <span className="font-bold text-xl">Booking</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Stays
            </Link>
            <Link to="/attractions" className="hover:text-blue-200 transition-colors">
              Attractions
            </Link>
            <Link to="/car-rentals" className="hover:text-blue-200 transition-colors">
              Car rentals
            </Link>
            <Link to="/airport-taxis" className="hover:text-blue-200 transition-colors">
              Airport taxis
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                  <Globe className="h-4 w-4 mr-1" />
                  EN
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Ελληνικά</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
              EUR
            </Button>

            {/* Favorites */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
              <Heart className="h-4 w-4" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                  <User className="h-4 w-4 mr-1" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Sign in</DropdownMenuItem>
                <DropdownMenuItem>Register</DropdownMenuItem>
                <DropdownMenuItem>My bookings</DropdownMenuItem>
                <DropdownMenuItem>Wishlist</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-white">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="text-lg font-medium">Stays</Link>
                  <Link to="/attractions" className="text-lg font-medium">Attractions</Link>
                  <Link to="/car-rentals" className="text-lg font-medium">Car rentals</Link>
                  <Link to="/airport-taxis" className="text-lg font-medium">Airport taxis</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}