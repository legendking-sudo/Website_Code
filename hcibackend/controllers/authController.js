import bcrypt from 'bcryptjs';
const { hash, compare } = bcrypt;
import {Property,Owner, NormalUser } from '../models/userModel.js';
import session from 'express-session';
import express from 'express';
import uploadOnCloudinary from '../cloudinary.js'; 
import nodemailer from 'nodemailer';


const app = express();
app.use(express.json());
export const sessionMiddleware = session({
  secret: 'simple_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true },
});
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'saraswatdevesh98@gmail.com', 
    pass: 'bsdi rtpc agci mnxh', 
  },
});




// Sign Up Logic (POST)
export async function signUp(req, res) {
  const { name, email, password, phoneNumber, type, sellerId } = req.body;
  console.log(req.body);
  
  try {
    // Check if the user already exists
    const User = type === 'Owner' ? Owner : NormalUser; // Choose the correct model
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the new user
    const newUser = type === 'Owner' 
      ? new Owner({ name, email, password: hashedPassword, phoneNumber, sellerId }) 
      : new NormalUser({ name, email, password: hashedPassword });
    
    await newUser.save();

    // Store user information in session after successful registration
    req.session.userId = newUser._id;  // Store user ID in session
    req.session.userType = type;       // Store user type (Owner/NormalUser)
     console.log(req.session.userType);
     console.log(req.session.userId);
     await transporter.sendMail({
      from: 'saraswatdevesh98@gmail', // Replace with your email
      to: email,
      subject: 'Welcoming message',
      text: "Thank you for registering with us. We're thrilled to have you on board!",
    })

  
  

    // Return a success response
    res.status(201).json({ message: 'User registered successfully', user: newUser,userType: req.session.userType,userId: req.session.userId });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Sign In Logic (POST)
export async function signIn(req, res) {
  console.log(req.body);
  const { email, password, type } = req.body;  // type: 'Owner' or 'NormalUser'
  try {
    const User = type === 'Owner' ? Owner : NormalUser; // Choose the right model
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Store user session data
    req.session.userId = user._id;
    req.session.userType = type;
     console.log(req.session.userType);
    res.json({ message: 'Signed in successfully',userType: req.session.userType,userId: req.session.userId });
  } catch (error) {
    console.log("galat phas gye guru")
    res.status(500).json({ error: error.message });
  }
}

// Sign Out Logic (POST)
export function signOut(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Error signing out' });
    res.json({ message: 'Signed out successfully' });
  });
}

// Owner-specific: Create Property Listing (POST)


export async function addPropertyListing(req, res) {
  console.log(req.body);
  // Check if user is an owner
  if (req.body.userType !== 'Owner') {
    return res.status(403).json({ message: 'Only owners can add properties' });
  }

  // Destructure the required fields from the request body
  const {
    title,
    description,
    propertyType,
    listingStatus,
    location,
    area,
    price,
    bathrooms,
    bedrooms,
    userId,
  } = req.body;

  try {
  
    if (!req.file) {
      return res.status(400).json({ message: 'No property image uploaded.' });
    }

    // Upload the image to Cloudinary and get the URL
    const imageUrl = await uploadOnCloudinary(req.file.path);
    if (!imageUrl) {
      return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
    }
console.log(imageUrl);
   
    const formattedPropertyType = propertyType.charAt(0).toUpperCase() + propertyType.slice(1).toLowerCase();
    console.log(1);

    // Create the new property listing
    const newProperty = await Property.create({
      title,
      description,
      propertyType: formattedPropertyType,
      listingStatus,
      location,
      area,
      price,
      bathrooms,
      bedrooms,
      userId,
      imageurl: imageUrl,
      // Save the Cloudinary image URL in the property document
    });

    // Find the owner and update their property listings
    const owner = await Owner.findById(userId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    owner.propertyListings.push(newProperty._id); // Add the new property to the owner's listings
    owner.propertiesListed += 1;
    await owner.save();

    // Respond with success
    res.status(201).json({ message: 'Property added successfully', property: newProperty });
  } catch (error) {
    console.error('Error in adding property:', error.message);
    res.status(500).json({ error: error.message });
  }
}


// Get Properties for Both Normal Users and Owners (GET)
export async function getProperties(req, res) {
  try {
    const properties = await Property.find(); // Fetch all properties
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get Properties for Specific Owner (GET)
export async function getOwnerProperties(req, res) {
  console.log(req.body);
  if (req.body.userType !== 'Owner') {
    return res.status(403).json({ message: 'Only owners can view their properties' });
  }
  console.log("ji aa gye kya")
  try {
    const owner = await Owner.findById(req.body.userId).populate('propertyListings');
    res.status(200).json(owner.propertyListings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProperty  (req, res) {
  res.json({ message: 'Property deleted successfully' });
}


export async function getUserInfo (req, res) {
 const {userId} = req.query; // Assuming userId is passed as a URL parameter

  try {
    // Find the user by userId
    const user = await Owner.findById(userId)
      .populate('propertyListings') // Populate propertyListings
      .exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the number of properties listed
    const numberOfListings = user.propertyListings.length;

    // Respond with user information and number of listings
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        sellerId: user.sellerId,
      },
      numberOfListings,
       // Optional: include properties if needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export async function  propertiesListed (req,res){
 try{ const propertiesListing = await Property.find();
  res.status(200).json( propertiesListing );
 }
  catch(error) {
 res.status(500).json({ error: error.message });
}
}
