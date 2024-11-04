import { Router, json } from 'express';
import bodyParser from 'body-parser'; 
import express from 'express';
const router = Router();
const app =express();
import { sessionMiddleware, signIn, signOut, signUp, addPropertyListing, getProperties, getOwnerProperties, deleteProperty ,getUserInfo,propertiesListed} from '../controllers/authController.js';

import { upload } from '../multer-config.js'; 
// import multer from 'multer'

// const upload = multer();
// const uploadNone = upload.none();
// Middleware


// Session middleware
router.use(sessionMiddleware);

// Auth Routes
router.post('/signin', signIn);    
router.post('/signout', signOut);  
router.post('/signup', signUp); 
// Property Routes
router.post('/properties',upload.single('image'),addPropertyListing); 
       
router.get('/owner/properties', getOwnerProperties); 
router.get('/owner', deleteProperty);
router.get('/getDetails', getUserInfo) 
router.get('/properties-information',propertiesListed) 

export default router;
