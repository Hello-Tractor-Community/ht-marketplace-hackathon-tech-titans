const mongoose = require('mongoose');
const User = require('../../models/User');
const Agent = require('../../models/Agent'); // Import Agent model
const generateRandomOtp = require('../../utils/GenerateOtp');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/agents/'); // Directory to save agent images
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage });

const CreateUser = async (req, res) => {
    const { firstName, lastName, middleName, email, password, userType, companyDetails,contactDetails } = req.body;

    try {
        console.log('Received request to create user');

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

        // If there are errors, return them
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Provide all required information to complete', errors });
        }

        console.log('Creating user:', data);

        // Create the user
        const newUser = await User.create(data);

        // Additional data creation for specific user types
        if (userType === 'seller') {
            // Create an Agent record for the seller
            if (!companyDetails.name || !contactDetails || !contactDetails.phone || !contactDetails.email) {
                return res.status(400).json({
                    message: 'Missing required fields for seller',
                    errors: {
                        companyDetails: 'Company details are required for seller',
                        contactDetails: 'Valid contact details are required for seller',
                    },
                });
            }

            // Handle company logo upload
            let logoPath = null;
            if (req.file) {
                logoPath = req.file.path; // Path of uploaded logo
            }

            const agentData = {
                user: newUser._id,
                companyDetails: {
                    ...companyDetails,
                    logo: logoPath, // Add the logoPath to companyDetails
                },
                contactDetails, // This will include the provided contact details (phone and email)
            };
            

            const newAgent = await Agent.create(agentData);
            console.log('Agent created:', newAgent);
        }

        // Return success response
        res.status(201).json({ message: 'User profile created successfully', data: newUser });
    } catch (error) {
        console.error('Error creating user profile:', error.message);
        res.status(500).json({ message: 'Error creating user profile', error: error.message });
    }
};

// Middleware to handle file upload
const uploadSingleImage = upload.single('logo');

module.exports = {
    CreateUser,
    uploadSingleImage,
};
