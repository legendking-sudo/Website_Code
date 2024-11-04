import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Lock, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    sellerId: '',
    type: 'NormalUser',
  });
  const [notification, setNotification] = useState({ visible: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, type: value });
  };

  const showNotification = (message) => {
    setNotification({ visible: true, message });
    setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 2000);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email: formData.email,
        password: formData.password,
        type: formData.type,
      }, { withCredentials: true });
      if (response.data.userType) {
        localStorage.setItem('userType', response.data.userType);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('loginStatus', "success");
        showNotification("Sign In Successful!");

        setTimeout(() => {
          if (response.data.userType === 'Owner') {
            window.location.href = '/SellerDashboard';
          } else {
            window.location.href = '/';
          }
        }, 2000);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        sellerId: formData.sellerId,
        type: formData.type,
      }, { withCredentials: true });
      if (response.data.userType) {
        localStorage.setItem('userType', response.data.userType);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('loginStatus', "success");
        showNotification("Sign Up Successful!");

        setTimeout(() => {
          if (response.data.userType === 'Owner') {
            window.location.href = '/SellerDashboard';
          } else {
            window.location.href = '/';
          }
        }, 2000);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <Link to="/" className="flex items-center mb-8">
        <Home className="h-8 w-8 text-green-500 mr-2" />
        <span className="text-2xl font-bold text-gray-800">RentUP</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? "Sign In" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Welcome back! Please sign in to your account."
              : "Create an account to start using RentUP."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full" onValueChange={(value) => setIsLogin(value === 'signin')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form className="space-y-4" onSubmit={handleSignIn}>
                <div className="space-y-2">
                  <Label htmlFor="role">Sign In as</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sign In as" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NormalUser">Normal User</SelectItem>
                      <SelectItem value="Owner">Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input id="email" name="email" type="email" placeholder="Enter your email" className="pl-10" onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input id="password" name="password" type="password" placeholder="Enter your password" className="pl-10" onChange={handleChange} />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Sign In 
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form className="space-y-4" onSubmit={handleSignUp}>
                <div className="space-y-2">
                  <Label htmlFor="role">Sign Up as</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sign Up as" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NormalUser">Normal User</SelectItem>
                      <SelectItem value="Owner">Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input id="name" name="name" placeholder="Enter your full name" className="pl-10" onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input id="email" name="email" type="email" placeholder="Enter your email" className="pl-10" onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input id="password" name="password" type="password" placeholder="Create a password" className="pl-10" onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" className="pl-10" onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  {formData.type === 'Owner' && (
                    <>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" onChange={handleChange} />
                      <Label htmlFor="sellerId">Seller ID</Label>
                      <Input id="sellerId" name="sellerId" placeholder="Enter your seller ID" onChange={handleChange} />
                    </>
                  )}
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button
              variant="link"
              className="p-0 h-auto text-green-600 font-semibold hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Button>
          </p>
        </CardFooter>
      </Card>

      {notification.visible && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded shadow-lg">
          {notification.message}
        </div>
      )}
    </div>
  );
}
