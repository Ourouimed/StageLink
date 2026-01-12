import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { acceptRequest, declineRequest, getEntreprises, getProfile, updateProfile } from "../controllers/encadrantController.js"

const router = express.Router()

router.get('/' , verifyJWT , getProfile)
router.post('/update' , verifyJWT ,   updateProfile)
router.get('/entreprises' , verifyJWT , getEntreprises)
router.post('/entreprises/accept/:id' , verifyJWT , acceptRequest)
router.post('/entreprises/decline/:id' , verifyJWT , declineRequest)

export default router