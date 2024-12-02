"use client"

import React, { useState } from 'react';
import "./styles.css"

const Page = () => {
    const [search, setSearch] = useState("");

    const handleInputChange = (event) => {
        setSearch(event.target.value);
        console.log(search)
    };

    const handleSearch = () => {
        console.log(`Searching for: ${search}`);
        // Add your search logic here
    };

    return (
        <>
            <div className="search-box">
                <h1 className='search-title'>Search Your Favourite Games</h1>
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
            <div className="search-results">
                {/* Render search results here */}
            </div>
        </>
    );
};

export default Page;
