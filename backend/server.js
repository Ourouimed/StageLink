const express = require('express')
const app = express()
const PORT = 3001


const cors = require('cors')

// routes imports
const authRouter = require('./routes/auth')
const corsOptions = require('./middlewares/corsOptions')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser());

// configure cors options
app.use(cors(corsOptions))





// routes 
app.use('/api/auth' , authRouter)

if (process.env.NODE_ENV !== 'production') {
    // test route
    app.get('/' , (req , res)=>{
        res.send('Hello world')
    })
    app.listen(PORT , ()=>{
        console.log(`App is running in port : ${PORT}`)
        console.log(`visit : http://localhost:${PORT}`)
    })
}