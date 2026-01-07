import express from 'express'
import { createStage, getAllStage } from '../controllers/stageController.js'
import verifyJWT from '../middlewares/verifyJwt.js'
const router = express.Router()

router.post('/create' , verifyJWT , createStage)
router.get('/' , getAllStage)

export default router