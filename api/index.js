import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import reviewModel from './models/Review.js';
import userModel from './models/User.js';

dotenv.config()


const app = express();


//Middleware
app.use(express.json())
app.use(cors({ origin: 'http://localhost:4000' }));


//connecting to db
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

//Routes
app.get('/api/test',(req,res)=>{
    res.json({msg:"Helllo World"})
})

app.post('/api/reviews',async (req,res)=>{
    const {gameId,rating,review,userId} = req.body
    const comment = await reviewModel.create({ gameId, rating, review, userId });
    res.status(201).json(comment);
    res.json(comment)
})

app.get('/api/reviews',async(req,res)=>{
    // const gameId = req.query
    const reviews = await reviewModel.find()
    res.status(201)
    res.json(reviews)
})

app.post('/api/register',async(req,res)=>{
    const {firstName,lastName,email,password} = req.body
    const userProfile =await  userModel.create({firstName,lastName,email,password})
    res.json(userProfile)
})

app.post('/api/login', async(req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    
    if (!user) {
        console.error("TypeError: Cannot read properties of null (reading 'password')");
        return res.status(401).json({ error: "Invalid email or password" });
    }
    if (user.password === password) {
        res.status(201).send({userId:user._id});
    }
})

app.listen(4000)