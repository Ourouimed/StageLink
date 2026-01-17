import express from 'express'
import {createStage, deleteStage, getAllStage, getAllStagesByEntreprise, updateStage } from '../controllers/stageController.js'
import verifyJWT from '../middlewares/verifyJwt.js'
import checkBlocked from '../middlewares/verifyIsBlocked.js'
const router = express.Router()

router.post('/create' , verifyJWT , checkBlocked , createStage)
router.get('/entrepsie' , verifyJWT , checkBlocked , getAllStagesByEntreprise)
router.delete('/delete/:id' , verifyJWT , checkBlocked , deleteStage)
router.put('/update/:id' , verifyJWT , checkBlocked , updateStage)
router.get('/' , verifyJWT , checkBlocked , getAllStage)
export default router