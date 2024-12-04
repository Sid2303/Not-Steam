"use client";

import React, { useState, useEffect } from "react";

interface Review {
    gameId: string;
    review: string;
    gameName?: string; // Add an optional property for the game name
    imageUrl?: string; // Add an optional property for the image URL
}

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        // Fetch reviews from localStorage
        const storedReviews = localStorage.getItem("reviews");
        if (storedReviews) {
            const parsedReviews: Review[] = JSON.parse(storedReviews);

            // Fetch game details (name and image) for each review
            Promise.all(
                parsedReviews.map(async (review) => {
                    try {
                        const response = await fetch(`https://www.freetogame.com/api/game?id=${review.gameId}`);
                        const data = await response.json();
                        return {
                            ...review,
                            gameName: data.title, // Include the game's name
                            imageUrl: data.thumbnail, // Include the game's image URL
                        };
                    } catch (error) {
                        console.error(`Failed to fetch game data for gameId: ${review.gameId}`, error);
                        return { ...review, gameName: "Unknown Game", imageUrl: "" }; // Fallback in case of an error
                    }
                })
            ).then((updatedReviews) => {
                setReviews(updatedReviews);
            });
        }
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-6">All Reviews</h1>
            <div className="grid grid-cols-4 gap-4">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div
                            key={index}
                            className="border rounded p-4 shadow-md flex flex-col items-center"
                        >
                            {review.imageUrl && (
                                <img
                                    src={review.imageUrl}
                                    alt={review.gameName || "Game"}
                                    className="mb-4 w-full h-40 object-cover rounded"
                                />
                            )}
                            <h2 className="text-lg font-semibold mb-2 text-center">
                                {review.gameName}
                            </h2>
                            <p className="text-sm text-gray-700 text-center">{review.review}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews found</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;
