'use client';
import  "./styles.css"

import React, { useState, useEffect } from 'react';

const Explore = () => {
  const [games, setGames] = useState([]); // State variable to store fetched games
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for error messages

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('https://www.freetogame.com/api/games');
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setGames(data); // Update state with fetched games
            console.log(games)
        } catch (err) {
            console.error('Error fetching games:', err);
            setError('Failed to fetch games. Please try again later.');
        } finally {
            setLoading(false); // End loading state
        }
        };

        fetchData(); // Call fetchData on component mount
    }, []); // Empty dependency array ensures fetchData runs only once

    return (
        <div className="flex flex-col w-full content-center items-center">
            <div className="explore-hero-section">Explore</div>
            <div className="explore-socials"></div>
            <div className="explore-section">
            {loading ? (
                <p>Loading games...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="explore-games grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {games.map((game) => (
                    <div key={game.id} className="explore-game p-4 border rounded-md">
                        <img src={game.thumbnail} alt={game.title} className="w-full h-40 object-cover" />
                        <h3 className="mt-2 text-lg font-semibold">{game.title}</h3>
                        <p className="text-sm text-gray-500">{game.platform}</p>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default Explore;
