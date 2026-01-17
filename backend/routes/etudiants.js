import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { getCandidatures, getProfile, getStages, updateProfile, uploadRapport } from "../controllers/etudiantsController.js"
import multer from 'multer';
import checkBlocked from "../middlewares/verifyIsBlocked.js";


const router = express.Router()


// Use memory storage because we'll send the file directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } }); // max 2MB



router.post('/update' , verifyJWT , checkBlocked , upload.single('cv') ,  updateProfile)
router.post('/upload-rapport' , verifyJWT , checkBlocked , upload.single('rapport') ,  uploadRapport)
router.get('/candidatures', verifyJWT , checkBlocked , getCandidatures)
router.get('/stages' , verifyJWT , checkBlocked , getStages)
router.get('/' , verifyJWT , checkBlocked , getProfile)
export default router