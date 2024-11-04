import React, { useEffect, useState } from 'react';
import { User, Eye, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom'; // Ensure Link is imported
import axios from 'axios'; // Import axios for API calls

export default function SellerDashboard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [numberOfListings, setNumberOfListings] = useState(0);
  const [loading, setLoading] = useState(true); // State to handle loading state
  const userId = localStorage.getItem('userId');
 
  useEffect(() => {
    const fetchSellerInformation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/getDetails?userId=${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        // Set each piece of information into its respective state
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPhoneNumber(response.data.user.phoneNumber);
        setSellerId(response.data.user.sellerId);
        setNumberOfListings(response.data.numberOfListings);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching seller information:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchSellerInformation(); // Call the function to fetch seller info
  }, [userId]); // Add userId to dependency array so it reruns when userId changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input value={name} className="bg-gray-100" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input value={email} className="bg-gray-100" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone No.</label>
              <Input value={phoneNumber} className="bg-gray-100" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Seller ID</label>
              <Input value={sellerId} className="bg-gray-100" readOnly />
            </div>
          </div>

          <div className="flex justify-between mb-6">
            {['Properties Sold', 'Happy Customers'].map((label) => (
              <div key={label} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-semibold">24</span> {/* Replace with dynamic data if needed */}
                </div>
                <p className="text-sm text-gray-600">{label}</p>
              </div>
            ))}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-semibold">{numberOfListings}</span>
              </div>
              <p className="text-sm text-gray-600">Number of Listings</p>
            </div>
          </div>

          <div className="flex justify-between">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Eye className="w-4 h-4 mr-2" />
              View Listings
            </Button>
            <Link to="/post-property">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
