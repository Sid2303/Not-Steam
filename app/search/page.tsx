"use client"

import React, { useEffect, useState } from 'react';
import "./styles.css";

const Page = () => {
    const [search, setSearch] = useState("");
    const [allGames, setAllGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearch(value);
    };

    const handleSearch = () => {
        console.log(`Searching for: ${search}`);
        setFilteredGames(
            allGames.filter((game) => 
                game.title.toLowerCase().startsWith(search.toLowerCase())
            )
        );
    };

    const getGames = async () => {
        try {
            const response = await fetch('https://www.freetogame.com/api/games');
            const data = await response.json();
            setAllGames(data);
            setFilteredGames(data); // Initialize filteredGames with all games
        } catch (error) {
            console.error("Error fetching games:", error);
        }
    };

    useEffect(() => {
        getGames();
    }, []);

    return (
        <>
        <div>
            <div className="search-box mb-10 mt-20">
                <input
                    id="search-box"
                    type="text"
                    placeholder="Enter name"
                    value={search}
                    onChange={handleInputChange}
                    className='search-bar text-black'
                />
                <button className="btn-2" onClick={handleSearch}>
                    <span className="btn-2-bg">
                        <span className="btn-2-bg-layers">
                            <span className="btn-2-bg-layer btn-2-bg-layer-1 -purple"></span>
                            <span className="btn-2-bg-layer btn-2-bg-layer-2 -turquoise"></span>
                            <span className="btn-2-bg-layer btn-2-bg-layer-3 -yellow"></span>
                        </span>
                    </span>
                    <span className="btn-2-inner">
                        <span className="btn-2-inner-static">Search</span>
                        <span className="btn-2-inner-hover">Search</span>
                    </span>
                </button>
            </div>

            <div className="game-container">
                {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <div key={game.id} className="game-card">
                            <img src={game.thumbnail} alt={game.title} className="game-image" />
                            <h3 className="game-title">{game.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>No games found</p>
                )}
            </div>
        </div>
            
        </>
    );
};

export default Page;
