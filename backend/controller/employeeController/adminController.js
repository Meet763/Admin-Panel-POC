// routes/employees.js
const Employee = require('../../models/Employee'); // Employee model
const {uploadOnCloudinary, deleteFromCloudinary} = require('../../utils/cloudnary')
const fs = require('fs')

const createEmployee = async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;

        // Check if an image file is provided
        if (!req.file) {
            return res.status(400).send({ error: 'Image is required' });
        }

        imagePath = req.file.path

        // Step 1: Validate required fields
        if (!name || !email || !mobile || !designation || !gender || !course) {
            // If required fields are missing, delete the local file and return an error
            fs.unlinkSync(imagePath);
            return res.status(400).send({ error: 'All fields are required' });
        }

         // Step 2: Check for duplicate email before uploading the image
         const existingEmployee = await Employee.findOne({ email });
         if (existingEmployee) {
             // Delete the file if a duplicate email is found
             fs.unlinkSync(imagePath);
             return res.status(400).send({ error: 'An employee with this email already exists' });
        }

        localImagePath = imagePath

        // Upload image to Cloudinary
        const imageUrl = await uploadOnCloudinary(imagePath); // Pass the local file path

        // Create a new employee document
        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course, // Assuming `course` is sent as a comma-separated string
            imageUrl, // Store Cloudinary URL in MongoDB
            localImagePath
        });

        // Save employee data to MongoDB
        await newEmployee.save();

        res.status(201).send({ message: 'Employee created successfully', employee: newEmployee });

    } catch (error) {
       // Optional: Clean up the local file in case of unexpected errors
       if (imagePath && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
       }
       res.status(500).send({ error: error.message });
    }
};


const editEmployee = async (req, res) => {
    try {
        const id = req.params.id; // Employee ID from request parameters
        const { name, email, mobile, designation, gender, course } = req.body;

        // Step 1: Check if the employee exists
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).send({ error: 'Employee not found' });
        }

        // Step 2: Check for duplicate email if it’s being changed
        if (email && email !== employee.email) {
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) {
                return res.status(400).send({ error: 'An employee with this email already exists' });
            }
        }

        // Step 3: Prepare update fields
        const updateFields = {
            name,
            email,
            mobile,
            designation,
            gender,
            course,
        };

        // Step 4: Handle optional new image upload
        if (req.file) {
            // Delete the old image from Cloudinary
            if (employee.imageUrl) {
                await deleteFromCloudinary(employee.imageUrl);
            }

            // Delete the old image from local storage (if it exists)
            if (fs.existsSync(employee.localImagePath)) {
                fs.unlinkSync(employee.localImagePath);
            }

            // Save the new image temporarily in local storage
            const newImagePath = req.file.path;
            updateFields.localImagePath = newImagePath

            // Upload the new image from local storage to Cloudinary
            const imageUrl = await uploadOnCloudinary(newImagePath);
            updateFields.imageUrl = imageUrl;
        }

        // Step 5: Update the employee in MongoDB
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateFields, {
            new: true, // Return the updated document
            runValidators: true, // Ensure any schema validations are enforced
        });

        res.status(200).send({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        // Clean up local file in case of unexpected errors
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).send({ error: error.message });
    }
};

const employeeList = async (req, res) => {
    try{
        const responce = await Employee.find()
        res.status(200).json({responce:responce})

    }catch(err){
        res.status(500).send({ error: error.message })
    }
}

const deleteEmployee = async (req, res) => {
    try{
        const id = req.params.id
        await Employee.findByIdAndDelete(id)
        res.status(200).json("this employee is deleted")
    }catch(err){
        res.status(500).send({ error: error.message })
    }
}

module.exports = {createEmployee, editEmployee, employeeList, deleteEmployee};
