const express  = require('express')
const authController = require('../controllers/authController')

const router = express.Router()


router.get('/' , (req , res)=>{
    res.send('Hello auth')
})
router.post('/register' , authController.register)
router.post('/login' , authController.login)
router.post('/verify-email' , authController.verfifyEmail)
router.get('/verify-session' , authController.verifySession)



module.exports = router