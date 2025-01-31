import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},{timeStamps: true})

const reviewModel = mongoose.model('Review',reviewSchema)

export default reviewModel