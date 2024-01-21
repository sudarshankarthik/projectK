import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import streamifier from 'streamifier';
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (req, res, next) => {
  try {
    const cld_upload_stream = cloudinary.uploader.upload_stream({
      folder: "foo"
    }, async (error, result) => {
      if (error) {
        console.error("Error during upload:", error);
        return next(error); // Pass the error to the next middleware
      }
      req.picturePath = result.url; // Store the URL in request.picturePath
      next();
    });

    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
  } catch (error) {
    console.error("Error during upload:", error);
    return next(error); // Pass the error to the next middleware
  }
};
