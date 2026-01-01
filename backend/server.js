const express = require('express')
const app = express()
const PORT = 3001

// routes imports
const authRouter = require('./routes/auth')


app.get('/' , (req , res)=>{
    res.send('Hello world')
})


// routes 
app.use('/api/auth' , authRouter)

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT , ()=>{
        console.log(`App is running in port : ${PORT}`)
        console.log(`visit : http://localhost:${PORT}`)
    })
}