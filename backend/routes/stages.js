import express from 'express'
import { createStage, deleteStage, getAllStage, getAllStagesByEntreprise, updateStage } from '../controllers/stageController.js'
import verifyJWT from '../middlewares/verifyJwt.js'
const router = express.Router()

router.post('/create' , verifyJWT , createStage)
router.get('/entrepsie' , verifyJWT , getAllStagesByEntreprise)
router.delete('/delete/:id' , verifyJWT , deleteStage)
router.put('/update/:id' , verifyJWT , updateStage)
router.get('/' , verifyJWT , getAllStage)
export default router