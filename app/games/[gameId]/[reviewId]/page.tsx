"use client";

import { useState, useEffect } from "react";
import "./styles.css";

export default function ReviewPage({ params }: { params: { gameId: string; reviewId: string } }) {
    const { gameId, reviewId } = params;
    const [review, setReview] = useState("");
    const [gameName, setGameName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load existing review and game data
    useEffect(() => {
        // Check for localStorage availability
        if (typeof window !== "undefined") {
            const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
            const savedReview = savedReviews.find((item: { gameId: string; reviewId: string }) => item.gameId === gameId && item.reviewId === reviewId);
            if (savedReview) {
                setReview(savedReview.review);
            }
        }

        // Fetch game data if gameId is valid
        if (gameId) {
            fetch(`https://www.freetogame.com/api/game?id=${gameId}`)
                .then((response) => response.json())
                .then((data) => {
                    setGameName(data.title);
                    setLoading(false); // Stop loading after fetching data
                })
                .catch((error) => {
                    setError("Failed to load game data.");
                    setLoading(false);
                });
        } else {
            setError("Invalid game ID.");
            setLoading(false);
        }
    }, [gameId, reviewId]);

    // Save review to local storage, appending it to the reviews array
    const handleSaveReview = () => {
        if (typeof window !== "undefined") {
            const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

            // Find if the review already exists (for the same gameId and reviewId)
            const existingReviewIndex = savedReviews.findIndex((item: { gameId: string; reviewId: string }) => item.gameId === gameId && item.reviewId === reviewId);

            if (existingReviewIndex !== -1) {
                // Update existing review if it exists
                savedReviews[existingReviewIndex].review = review;
            } else {
                // Append new review if it does not exist
                savedReviews.push({
                    gameId,
                    reviewId,
                    review,
                });
            }

            // Save the updated reviews array back to local storage
            localStorage.setItem("reviews", JSON.stringify(savedReviews));
            alert("Review saved!");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-5">
            {/* Display Game Name */}
            <h1 className="text-2xl font-bold mb-4">Game: {gameName}</h1>

            {/* Display Review Section */}
            <h2 className="text-xl mb-2">Add a review</h2>

            {/* Textarea for writing review */}
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full h-40 p-2 border rounded text-black"
                placeholder="Write your review here..."
            />

            {/* Save Review Button */}
            <button
                onClick={handleSaveReview}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Save Review
            </button>
        </div>
    );
}
