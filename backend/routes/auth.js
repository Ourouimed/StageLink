import express from 'express'
import {register , login , logout , verifySession , verifyEmail , resendOtp} from  '../controllers/authController.js'
import verifyJWT from '../middlewares/verifyJwt.js'

const router = express.Router()


router.get('/' , (req , res)=>{
    res.send('Hello auth')
})
router.post('/register' , register)
router.post('/login' , login)
router.get('/verify-session' , verifyJWT , verifySession)
router.post('/verify-email' , verifyEmail)
router.post('/resend-otp' , resendOtp)



export default router