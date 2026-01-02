import express from 'express'
// routes imports
import authRouter from './routes/auth.js'
import corsOptions from './middlewares/corsOptions.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors'



const app = express()
const PORT = 3001







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