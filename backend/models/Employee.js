const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensures email uniqueness
        match: [/.+\@.+\..+/, 'Please enter a valid email'], // Basic email regex pattern
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'], // Validates 10-digit numbers
    },
    designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales'], // Restricts to specific roles
        required: [true, 'Designation is required'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true, 'Gender is required'],
    },
    course: {
        type: [String],
        enum: ['MCA', 'BCA', 'BSC'],
        required: [true, 'Course selection is required'],
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required'], // Ensures an image URL is saved
    },
    localImagePath: { 
        type: String 
    }
})

const employee = mongoose.model('employee', employeeSchema)
module.exports = employee;