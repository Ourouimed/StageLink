import express from 'express'
import verifyJWT from '../middlewares/verifyJwt.js'
import { createCandidature } from '../controllers/candidatureController.js'
import checkBlocked from '../middlewares/verifyIsBlocked.js'
const router = express.Router()

router.post('/create' , verifyJWT , checkBlocked , createCandidature)
export default router