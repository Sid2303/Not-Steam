"use client";

import { useState, useEffect } from "react";

interface Review {
    gameId: string;
    userId: string;
    rating: number;
    review: string;
}

export default function ReviewPage({ params }: { params: Promise<{ gameId: string; reviewId: string }> }) {
    const [gameId, setGameId] = useState<string | null>(null);
    const [reviewId, setReviewId] = useState<string | null>(null);
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [isSaving, setIsSaving] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [allReviews, setAllReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [gameName, setGameName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Unwrapping the params promise and setting state
    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setGameId(resolvedParams.gameId);
            setReviewId(resolvedParams.reviewId);
        };

        unwrapParams();

        // Fetch the user ID from localStorage
        setUserId(localStorage.getItem("userId"));
    }, [params]);

    // Fetch the game details
    useEffect(() => {
        if (!gameId) return;

        setLoading(true);
        fetch(`https://www.freetogame.com/api/game?id=${gameId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch game data");
                }
                return response.json();
            })
            .then((data) => {
                setGameName(data.title);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load game data.");
                setGameName(null);
            })
            .finally(() => setLoading(false));
    }, [gameId]);

    // Fetch all reviews for the game
    const getReviews = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/reviews");
            if (!response.ok) {
                throw new Error("Failed to fetch reviews.");
            }

            const reviews: Review[] = await response.json();
            const gameReviews = reviews.filter((r) => r.gameId === gameId);
            setAllReviews(gameReviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setError("Failed to load reviews.");
        }
    };

    useEffect(() => {
        if (gameId) {
            getReviews();
        }
    }, [gameId]);

    // Save a new review
    const saveReview = async () => {
        if (!userId) {
            alert("User not logged in.");
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch("http://localhost:4000/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameId, rating, review, userId }),
            });

            if (!response.ok) {
                throw new Error("Failed to save review.");
            }

            alert("Review saved successfully!");
            setReview("");
            setRating(0);
            await getReviews();
        } catch (error) {
            console.error("Error saving review:", error);
            alert("Error saving review.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col w-full">
            <div className="inputRating">
                <div className="p-5 review-area">
                    <h1 className="text-2xl font-bold mb-10">Game: {gameName || "Unknown"}</h1>
                    <h1 className="rate-heading">Give your review</h1>
                    <h3>{rating}</h3>
                    <input
                        type="range"
                        min={0}
                        max={5}
                        step={0.5}
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="rating-bar"
                    />
                    <h2 className="text-xl mb-2">Add a review</h2>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full h-20 p-2 border rounded text-black review-input"
                        placeholder="Write your review here..."
                    />
                    <button
                        onClick={saveReview}
                        disabled={isSaving}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 submit-button"
                    >
                        {isSaving ? "Saving..." : "Save Review"}
                    </button>
                </div>
            </div>

            <div className="ratings">
                {allReviews.length > 0 ? (
                    allReviews.map((r, index) => (
                        <div key={index} className="rating">
                            <div className="stars">Rating: {r.rating}</div>
                            <div className="comment">{r.review}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to add one!</p>
                )}
            </div>
        </div>
    );
}
