import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { getProfile } from "../controllers/encadrantController.js"

const router = express.Router()

router.get('/' , verifyJWT , getProfile)


export default router