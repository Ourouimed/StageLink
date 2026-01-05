import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { getProfile, updateProfile } from "../controllers/entrepriseController.js"
const router = express.Router()

router.post('/update' , verifyJWT , updateProfile)
router.get('/' , verifyJWT , getProfile)
export default router