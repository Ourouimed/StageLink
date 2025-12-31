const express = require('express')
const app = express()
const PORT = 3001


app.get('/' , (req , res)=>{
    res.send('Hello world')
})
app.listen(PORT , ()=>{
    console.log(`App is running in port : ${PORT}`)
    console.log(`visit : http://localhost:${PORT}`)
})