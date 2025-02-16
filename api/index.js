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

app.get('/api/game/reviews', async (req, res) => {
    const { gameId } = req.query; // Get gameId from query parameters

    if (!gameId) {
        return res.status(400).json({ error: "gameId is required" });
    }

    try {
        const allReviews = await reviewModel.find({ gameId });
        res.json(allReviews);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.log(error)
    }
});


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


//Login route
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


//Finding the users given reviews
app.post("/api/myreviews", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const myReviews = await reviewModel.find({ userId });

        if (myReviews.length === 0) {
            return res.status(404).json({ error: "No reviews found for this user." });
        }

        res.status(200).json(myReviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//Deleting a review

app.delete("/api/delete", async (req, res) => {
    try {
        const { gameId, _id } = req.body;
        const response = await reviewModel.deleteOne({ gameId, _id: new mongoose.Types.ObjectId(_id) });
        res.json({ message: "Review deleted successfully", deleted: response });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//Updateing a review

app.patch('/api/game/reviews/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    const updates = req.body; // Only update the provided fields

    try {
        const updatedReview = await reviewModel.findByIdAndUpdate(
            reviewId,
            updates,
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: "Failed to update review" });
        console.log(error)
    }
});


app.listen(4000)