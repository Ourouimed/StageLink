import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { accepterCandidature, addEncadrant, addNoteEvaluation, declineCandidature, getCandidats, getEncadrants, getProfile, getStages, updateProfile } from "../controllers/entrepriseController.js"
const router = express.Router()

router.post('/update' , verifyJWT , updateProfile)
router.get('/' , verifyJWT , getProfile)
router.get('/candidats' , verifyJWT , getCandidats)
router.get('/encadrants' , verifyJWT , getEncadrants)
router.get('/stages' , verifyJWT , getStages)
router.post('/encadrants/add/:id', verifyJWT , addEncadrant)
router.post('/candidature/accept/:id' , verifyJWT , accepterCandidature)
router.post('/candidature/decline/:id' , verifyJWT , declineCandidature)


router.post('/stages/addNoteEvaluation/:id' , verifyJWT , addNoteEvaluation)
export default router