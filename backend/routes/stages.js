import express from 'express'
import { createStage, getAllStage, getAllStagesByEntreprise } from '../controllers/stageController.js'
import verifyJWT from '../middlewares/verifyJwt.js'
const router = express.Router()

router.post('/create' , verifyJWT , createStage)
router.get('/entrepsie' , verifyJWT , getAllStagesByEntreprise)
router.get('/' , verifyJWT , getAllStage)
export default router