// Imports
import express from 'express'
import helmet from 'helmet'
import { config } from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'
import morgan from 'morgan'
import cors from 'cors'
import multer, { diskStorage } from 'multer'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { register } from './controllers/auth.js'
import { log } from 'console'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "storage/images")));


// file storage
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
    
// Routes
app.post("/auth/register", upload.single("picture"), register)
app.use("/auth",authRoutes)
app.use("/users",userRoutes)

//MONGOOSE
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        app.listen(PORT, () => console.log("listning on port 3001..."))
    }
).catch(
    (e) => console.log(e)
)