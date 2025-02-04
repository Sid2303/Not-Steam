"use client";

import React, { useState, useEffect } from "react";
import "./styles.css";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState({}); // Store game details

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const userId = localStorage.getItem("userId");
        
                if (!userId) {
                    console.error("No user ID found in localStorage.");
                    return;
                }
        
                const response = await fetch("http://localhost:4000/api/myreviews", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });
        
                const data = await response.json();
        
                // console.log("Fetched Reviews:", data); // 
        
                setReviews(data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };
        

        fetchReviews();
    }, []);

    useEffect(() => {
        const fetchGameDetails = async () => {
            if (reviews.length === 0) return;

            const gameData = {};
            await Promise.all(reviews.map(async (review) => {
                try {
                    const response = await fetch(`https://www.freetogame.com/api/game?id=${review.gameId}`);
                    const data = await response.json();
                    gameData[review.gameId] = data; // Store game details using gameId as key
                } catch (error) {
                    console.error(`Error fetching game details for ${review.gameId}:`, error);
                }
            }));

            setGames(gameData);
        };

        fetchGameDetails();
    }, [reviews]);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-6">All Reviews</h1>
            {loading ? (
                <div className="text-center">Loading reviews...</div>
            ) : reviews.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {reviews.map((review, index) => {
                        const game = games[review.gameId]; // Get game details

                        return (
                            <div
                                key={index}
                                className="border rounded p-4 shadow-md flex flex-col items-center game-card"
                            >
                                {game ? (
                                    <>
                                        <img src={game.thumbnail} alt={game.title} className="w-full h-40 object-cover rounded-md" />
                                        <h3 className="text-lg font-bold mt-2">{game.title}</h3>
                                    </>
                                ) : (
                                    <p>Loading game details...</p>
                                )}

                                <p className="text-yellow-500 font-bold mt-4">Rating: {review.rating}/5</p>
                                <p className="mt-2 text-white">{review.review}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center">No reviews found</p>
            )}
        </div>
    );
};

export default Reviews;
