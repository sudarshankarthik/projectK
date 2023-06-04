import multer, { diskStorage } from 'multer'

const storage = diskStorage({
    destination: (req,file,cb) => {
        cb(null,"storage/images")
    },
    filename: (req,file,cb) => {  
        req.picturePath = file.originalname 
        cb(null,file.originalname)
    }
})
const upload = multer({storage})
export default upload