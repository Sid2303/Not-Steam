"use client";

import React, { useState, useEffect } from "react";
import "./styles.css";

interface Review {
    gameId: string;
    review: string;
    gameName?: string;
    imageUrl?: string;
}

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedReviews = localStorage.getItem("reviews");
        if (storedReviews) {
            const parsedReviews: Review[] = JSON.parse(storedReviews);

            Promise.all(
                parsedReviews.map(async (review) => {
                    try {
                        const response = await fetch(
                            `https://www.freetogame.com/api/game?id=${review.gameId}`
                        );
                        const data = await response.json();
                        return {
                            ...review,
                            gameName: data.title,
                            imageUrl: data.thumbnail,
                        };
                    } catch (error) {
                        console.error(`Failed to fetch game data for gameId: ${review.gameId}`, error);
                        return { ...review, gameName: "Unknown Game", imageUrl: "" };
                    }
                })
            ).then((updatedReviews) => {
                setReviews(updatedReviews);
                setLoading(false); // Set loading to false once all fetches are completed
            });
        } else {
            setLoading(false); // No stored reviews, loading is done
        }
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-6">All Reviews</h1>
            {loading ? (
                <div className="text-center">Loading reviews...</div>
            ) : reviews.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="border rounded p-4 shadow-md flex flex-col items-center game-card"
                        >
                            {review.imageUrl && (
                                <img
                                    src={review.imageUrl}
                                    alt={review.gameName || "Game"}
                                    className="mb-4 w-full h-40 object-cover rounded"
                                />
                            )}
                            <h2 className="text-lg font-bold mb-2 text-center">
                                {review.gameName}
                            </h2>
                            <p className="text-sm text-white text-center">{review.review}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No reviews found</p>
            )}
        </div>
    );
};

export default Reviews;
