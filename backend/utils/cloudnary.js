const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_SECRET // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploadOnCloudinary = async (localFilePath)=> {
    try{
        if(!localFilePath) return null
        //upload the file on cloudnary
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"image"
        })
        //file uploded succesfully.
        console.log("image uploded succesfully ", responce.url)
        return responce.secure_url
    }catch(err){
        fs.unlinkSync(localFilePath) //remove the locally saved temp images if upload operation get failed
        return null
    }
}

// Delete image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
    try {
        const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error('Failed to delete image:', err);
    }
};

module.exports = {uploadOnCloudinary, deleteFromCloudinary}
