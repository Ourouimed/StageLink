import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { acceptRequest, addNotePedagogique, declineRequest, getEntreprises, getProfile, getStages, updateProfile } from "../controllers/encadrantController.js"
import checkBlocked from "../middlewares/verifyIsBlocked.js"

const router = express.Router()

router.get('/' , verifyJWT , checkBlocked, getProfile)
router.post('/update' , verifyJWT , checkBlocked,   updateProfile)
router.get('/entreprises' , verifyJWT , checkBlocked, getEntreprises)
router.post('/entreprises/accept/:id' , verifyJWT , checkBlocked, acceptRequest)
router.post('/entreprises/decline/:id' , verifyJWT , checkBlocked, declineRequest)
router.get('/stages' , verifyJWT , checkBlocked, getStages)


router.post('/stages/addNotePedagogique/:id' , verifyJWT , checkBlocked , addNotePedagogique)

export default router