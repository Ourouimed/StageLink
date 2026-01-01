const express  = require('express')
const authController = require('../controllers/authController')

const router = express.Router()


router.get('/' , (req , res)=>{
    res.send('Hello auth')
})
router.post('/register' , authController.register)



module.exports = router