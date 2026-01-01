const express  = require('express')
const authController = require('../controllers/authController')

const router = express.Router()



router.post('/login' , authController.register)
router.get('/' , (req , res)=>{
    res.send('Hello auth')
})


module.exports = router