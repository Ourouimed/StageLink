import express from 'express'
import {register , login , logout , verfifyEmail , verifySession} from  '../controllers/authController.js'
import verifyJWT from '../middlewares/verifyJwt.js'

const router = express.Router()


router.get('/' , (req , res)=>{
    res.send('Hello auth')
})
router.post('/register' , register)
router.post('/login' , login)
router.post('/verify-email' , verfifyEmail)
router.get('/verify-session' , verifyJWT , verifySession)



export default router