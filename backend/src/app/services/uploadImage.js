import cloudinary from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

export const uploadImageCloudinary = async (file) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_KEY_PUBLIC,
            api_secret: process.env.CLOUDINARY_KEY_SECRET,
            secure: true
        })

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        const result = await cloudinary.v2.uploader.upload(file?.path, options);

        return {
            url: result.secure_url
        }
    } catch (error) {
        return {
            message: "Update image to cloudinary failed",
            error: error
        }
    }
}