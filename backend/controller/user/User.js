const mongoose = require('mongoose');
const User = require('../../models/User');
const Agent = require('../../models/Agent');
const generateRandomOtp = require('../../utils/GenerateOtp');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const Customer = require('../../models/Customer');

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/sellers/'); // Directory to save seller images
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage });

// Middleware to handle file upload
const uploadSingleImage = upload.single('logo');

let newUser;

const CreateUser = async (req, res) => {
    const { firstName, lastName, middleName, email, password, userType, companyDetails, contactDetails } = req.body;
    console.log(req.file)
    try {
        console.log('Received request to create user', req.body);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Error creating user: email already exists' });
        }

        // Validate and process user data
        const data = {};
        const errors = {};

        firstName ? (data.firstName = firstName.toLowerCase()) : (errors.firstName = 'First Name required');
        lastName ? (data.lastName = lastName.toLowerCase()) : (errors.lastName = 'Last Name required');
        middleName ? (data.middleName = middleName.toLowerCase()) : null;
        email ? (data.email = email.toLowerCase()) : (errors.email = 'Email required');
        password ? (data.password = await bcrypt.hash(password, 10)) : (errors.password = 'Password required');
        userType ? (data.userType = userType) : (errors.userType = 'User Type required');
        data.authToken = generateRandomOtp();
        if (req.file) {
            data.logo = `/uploads/sellers/${req.file.filename}`;
        } else {
            
            return res.status(400).json({ message: 'Logo is required for seller profile.' });
        }


        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Provide all required information to complete', errors });
        }

        console.log('Creating user:', data);

        // Create the user
        newUser = await User.create(data);

        // Additional data creation for specific user types
        const data2 = { companyDetails: {}, contactDetails: {} };
        const error2 = {};

        if (userType === 'seller') {
            if (!companyDetails || !contactDetails) {
                await User.findByIdAndDelete(newUser._id);
                return res.status(400).json({ message: 'Provide all required information to complete seller profile.' });
            }

            companyDetails.name
                ? (data2.companyDetails.name = companyDetails.name)
                : (error2.name = 'Company name required');
            companyDetails.description
                ? (data2.companyDetails.description = companyDetails.description)
                : (error2.details = 'Description required');

           

            data2.user = newUser._id;
            contactDetails.phone
                ? (data2.contactDetails.phone = contactDetails.phone)
                : (error2.phone = 'Phone Number required');
            contactDetails.email
                ? (data2.contactDetails.email = contactDetails.email)
                : (error2.email = 'Email required');

            if (Object.keys(error2).length > 0) {
                await User.findByIdAndDelete(newUser._id);
                return res.status(400).json({ message: 'Invalid seller details', errors: error2 });
            }

            const seller = await Agent.create(data2);
            console.log('seller', seller);
        } else if (userType === 'buyer') {
            data2.user = newUser._id;

            const customer = await Customer.create(data2);
            console.log('customer', customer);
        }

        res.status(201).json({ message: 'User profile created successfully', data: newUser });
    } catch (error) {
        if (newUser) await User.findByIdAndDelete(newUser._id);
        console.error('Error creating user profile:', error.message);
        res.status(500).json({ message: 'Error creating user profile', error: error.message });
    }
};

module.exports = {
    CreateUser,
    uploadSingleImage,
};
