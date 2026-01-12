import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { getProfile, updateProfile } from "../controllers/encadrantController.js"

const router = express.Router()

router.get('/' , verifyJWT , getProfile)
router.post('/update' , verifyJWT ,   updateProfile)


export default router