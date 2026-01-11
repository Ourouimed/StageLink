import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { getProfile, updateProfile } from "../controllers/etudiantsController.js"
import multer from 'multer';


const router = express.Router()


// Use memory storage because we'll send the file directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } }); // max 2MB



router.post('/update' , verifyJWT , upload.single('cv') ,  updateProfile)
router.get('/' , verifyJWT , getProfile)
export default router