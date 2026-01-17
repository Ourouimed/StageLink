import express from "express"
import verifyJWT from "../middlewares/verifyJwt.js"
import { accepterCandidature, addEncadrant, addNoteEvaluation, declineCandidature, endStage, getCandidats, getEncadrants, getProfile, getStages, updateProfile } from "../controllers/entrepriseController.js"
import checkBlocked from "../middlewares/verifyIsBlocked.js"
const router = express.Router()

router.post('/update' , verifyJWT , checkBlocked , updateProfile)
router.get('/' , verifyJWT , checkBlocked , getProfile)
router.get('/candidats' , verifyJWT , checkBlocked , getCandidats)
router.get('/encadrants' , verifyJWT , checkBlocked , getEncadrants)
router.get('/stages' , verifyJWT , checkBlocked , getStages)
router.post('/encadrants/add/:id', verifyJWT , checkBlocked , addEncadrant)
router.post('/candidature/accept/:id' , verifyJWT , checkBlocked , accepterCandidature)
router.post('/candidature/decline/:id' , verifyJWT , checkBlocked , declineCandidature)


router.post('/stages/addNoteEvaluation/:id' , verifyJWT , checkBlocked, addNoteEvaluation)

router.post('/stages/end/:id' , verifyJWT , checkBlocked , endStage)
export default router