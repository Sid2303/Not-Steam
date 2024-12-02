"use client";

import React, { useState, useEffect } from "react";

const Reviews = () => {
    const [reviews, setReviews] = useState<{ gameId: string; review: string }[]>([]);

    useEffect(() => {
        // Fetch reviews from localStorage
        const storedReviews = localStorage.getItem("reviews");
        if (storedReviews) {
            // Parse the stored reviews and update state
            setReviews(JSON.parse(storedReviews));
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
                            <h2 className="text-lg font-semibold mb-2 text-center">
                                Game ID: {review.gameId}
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
