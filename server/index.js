// Imports
import express from 'express'
import helmet from 'helmet'
import { config } from 'dotenv'
import path from 'path'
import {fileURLToPath} from 'url'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRouter from './routes/posts.js'
import adRouter from './routes/ad.js'
import rootRoutes from './routes/root.js'
 
// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "300mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "storage/images")));

// Routes

app.use("/",rootRoutes)
app.use("/auth",authRoutes)
app.use("/users",userRoutes)
app.use("/posts",postRouter)
app.use("/ad",adRouter)
//App
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true
}).then( 
    () => {
        app.listen(PORT, () => console.log("listning on port 5001..."))
    }
).catch(
    (e) => console.log(e)
)