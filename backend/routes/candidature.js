import express from 'express'
import verifyJWT from '../middlewares/verifyJwt.js'
import { createCandidature } from '../controllers/candidatureController.js'
const router = express.Router()

router.post('/create' , verifyJWT , createCandidature)
export default router