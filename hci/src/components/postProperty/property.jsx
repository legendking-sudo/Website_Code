'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, User, LogOut, Menu, X, Upload, DollarSign, MapPin, BedDouble, Bath, Square } from 'lucide-react'
import axios from 'axios'; // Import Axios

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PostPropertyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [image, setImage] = useState(null) // Changed to single image
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [listingStatus, setListingStatus] = useState('')
  const [price, setPrice] = useState('')
  const [area, setArea] = useState('')
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]) // Set single image
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('propertyType', propertyType);
    formData.append('listingStatus', listingStatus);
    formData.append('price', price);
    formData.append('area', area);
    formData.append('location', location);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
  
    // Get userType from local storage
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    if (userType) {
      formData.append('userType', userType); // Add userType to form data
    }
    if (userId) {
      formData.append('userId', userId); // Add userId to form data
    }

    if (image) {
      formData.append('image', image); // Append the single image
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Change to multipart/form-data
        },
        withCredentials: true, // Ensure cookies are sent with the request
      });

      console.log('Success:', response.data);
      window.location.href = '/';
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        {/* Your header content */}
      </header>

      {/* Property Posting Form */}
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Post a New Property</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="title">Property Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter property title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your property"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Select onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Listing Status</Label>
              <Select onValueChange={setListingStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select listing status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="for-rent">For Rent</SelectItem>
                  <SelectItem value="for-sale">For Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="price"
                  type="number"
                  className="pl-10"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (sqft)</Label>
              <div className="relative">
                <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="area"
                  type="number"
                  className="pl-10"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter area"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                  placeholder="Enter location"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <div className="relative">
                <BedDouble className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="bedrooms"
                  type="number"
                  className="pl-10"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  placeholder="No. of bedrooms"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <div className="relative">
                <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="bathrooms"
                  type="number"
                  className="pl-10"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  placeholder="No. of bathrooms"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" onChange={handleImageUpload} />
          </div>

          <div>
            <Button type="submit" className="w-full">
              Submit Property
            </Button>
          </div>
        </form>
        </main>
        </div>
  )
}
