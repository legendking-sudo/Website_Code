import { Schema, model } from 'mongoose';

// Owner Schema
const ownerSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  sellerId: { type: String },
  propertiesListed: { type: Number, default: 0 },
  propertyListings: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
});

const Owner = model('Owner', ownerSchema);

// Normal User Schema
const normalUserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

const NormalUser = model('NormalUser', normalUserSchema);

// Property Schema
const propertySchema = new Schema({
  title: { 
    type: String 
  },          
  description: { 
    type: String
  },
  propertyType: {
    type: String,
    enum: ['Apartment', 'Condo', 'Home', 'Office', 'House'], // Added 'House' to enum
    default: 'Apartment',
  },
  listingStatus: { type: String },    // New field for listing status
  price: { type: String },            // Made price required
  area: { type: String },                              // Area for more details
  location: { type: String },
  bedrooms: { type: String },         // New field for bedrooms
  bathrooms: { type: String },        // New field for bathrooms
  userType: { type: String }, 
  imageurl: { type: String },        // New field for userType
});


const Property = model('Property', propertySchema);

export  { Owner, NormalUser, Property };
