import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { addEncadrant, getCandidats, getEncadrants, getProfile, updateProfile } from "../controllers/entrepriseController.js"
const router = express.Router()

router.post('/update' , verifyJWT , updateProfile)
router.get('/' , verifyJWT , getProfile)
router.get('/candidats' , verifyJWT , getCandidats)
router.get('/encadrants' , verifyJWT , getEncadrants)
router.post('/encadrants/add/:id', verifyJWT , addEncadrant)
export default router