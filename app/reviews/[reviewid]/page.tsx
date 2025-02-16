"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";
import { useSearchParams } from "next/navigation";

export default function EditReview({ params }: { params: { reviewid: string } }) {
    const searchParams = useSearchParams();
    const gameId = searchParams.get("gameId");
    const [gameName, setGameName] = useState("Loading...");
    const [rating, setRating] = useState(2.5); // Default rating
    const [reviewText, setReviewText] = useState(""); // Store review text

    useEffect(() => {
        const fetchGameDetails = async () => {
            if (!gameId) return;

            try {
                const response = await fetch(`https://www.freetogame.com/api/game?id=${gameId}`);
                const data = await response.json();
                setGameName(data.title || "Game Not Found");
            } catch (error) {
                console.error("Error fetching game details:", error);
                setGameName("Game Not Found");
            }
        };

        fetchGameDetails();
    }, [gameId]);

    // Function to handle form submission
    const handleSubmit = async () => {
        const reviewData = {
            rating,
            review: reviewText,
        };
    
        try {
            const response = await fetch(`http://localhost:4000/api/game/reviews/${params.reviewid}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Failed to update review");
            }
    
            console.log("Review updated:", data);
            alert("Review updated successfully!");
        } catch (error) {
            console.error("Error updating review:", error);
            alert("Failed to update review. Please try again.");
        }
    };
    

    return (
        <div className="flex flex-col w-full">
            <div className="inputRating">
                <div className="p-5 review-area">
                    <h1 className="text-2xl font-bold mb-10">Game: {gameName}</h1>
                    <h1 className="rate-heading">Edit your review</h1>

                    {/* Rating Slider */}
                    <input
                        type="range"
                        min={0}
                        max={5}
                        step={0.5}
                        value={rating}
                        onChange={(e) => setRating(parseFloat(e.target.value))}
                        className="rating-bar"
                    />
                    <p className="text-lg font-semibold mt-2">Rating: {rating}/5</p>

                    {/* Review Textarea */}
                    <h2 className="text-xl mb-2">Add a review</h2>
                    <textarea
                        className="w-full h-20 p-2 border rounded review-input"
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />

                    {/* Submit Button */}
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 submit-button"
                        onClick={handleSubmit}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}
