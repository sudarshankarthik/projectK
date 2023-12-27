import multer, { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library for generating unique filenames

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "storage/images");
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using UUID (Universally Unique Identifier)
        const uniqueFilename = `${uuidv4()}-${file.originalname}`;
        req.picturePath = uniqueFilename; // Set the picturePath to the unique filename
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage });
export default upload;
