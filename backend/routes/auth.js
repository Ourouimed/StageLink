import express from 'express'
import {register , login , logout , verifySession , verifyEmail , resendOtp} from  '../controllers/authController.js'
import verifyJWT from '../middlewares/verifyJwt.js'
import checkBlocked from '../middlewares/verifyIsBlocked.js'

const router = express.Router()


router.get('/' , (req , res)=>{
    res.send('Hello auth')
})
router.post('/register' , register)
router.post('/login'  , login )
router.post('/logout' , logout)
router.get('/verify-session' , verifyJWT , checkBlocked , verifySession)
router.post('/verify-email' , verifyEmail )
router.post('/resend-otp' , resendOtp)



export default router