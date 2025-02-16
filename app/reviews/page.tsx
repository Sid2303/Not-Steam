"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import "./styles.css";
import { Button } from "@/components/ui/button";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // New state to handle errors
    const [games, setGames] = useState({});
    const router = useRouter();

    async function deleteReview(gameId, _id) {
        try {
            const response = await fetch("http://localhost:4000/api/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameId, _id })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete review");
            }

            console.log("Review deleted:", data);
            setReviews((prevReviews) => prevReviews.filter(review => review._id !== _id));
            window.alert("Review Deleted");

        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const userId = localStorage.getItem("userId");

                if (!userId) {
                    console.error("No user ID found in localStorage.");
                    setError("No user ID found.");
                    setLoading(false);
                    return;
                }

                const response = await fetch("http://localhost:4000/api/myreviews", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });

                if (response.status === 404) {
                    setReviews([]); // No reviews found
                } else if (!response.ok) {
                    throw new Error("Failed to fetch reviews");
                } else {
                    const data = await response.json();
                    setReviews(data);
                }
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setError("Failed to load reviews");
                setLoading(false);
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
                    gameData[review.gameId] = data;
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
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : reviews.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {reviews.map((review, index) => {
                        const game = games[review.gameId];

                        return (
                            <div key={index} className="border rounded p-4 shadow-md flex flex-col items-center game-card">
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

                                <AlertDialog>
                                    <AlertDialogTrigger className="bg-black mt-2 w-32 h-10">Change</AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Edit or delete?</AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => router.push(`/reviews/${review._id}?gameId=${review.gameId}`)}
                                            >
                                                Edit
                                            </AlertDialogAction>
                                            <Button variant="destructive" onClick={() => deleteReview(review.gameId, review._id)}>
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
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
