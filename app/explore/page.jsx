/* eslint-disable @next/next/no-img-element */
'use client';
import  "./styles.css"
import { Skeleton } from "../../components/ui/skeleton"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel"

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
            setGames(data);
            console.log(games)
        } catch (err) {
            console.error('Error fetching games:', err);
            setError('Failed to fetch games. Please try again later.');
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    const goToPubg = () => {
        window.location.href = "https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/" ;
    };
    const goToCs = () => {
        window.location.href = "https://store.steampowered.com/app/730/CounterStrike_2/";
    };
    const goToGenshin = () => {
        window.location.href = "https://genshin.hoyoverse.com/pc-launcher/#/";
    };
    

    return (
        <div className="flex flex-col w-full content-center items-center">
            <div className="explore-hero-section">
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }}
                >
                    <CarouselContent >
                        <CarouselItem className="flex items-center justify-center">
                            <img src="https://cdn1.epicgames.com/spt-assets/53ec4985296b4facbe3a8d8d019afba9/pubg-battlegrounds-1e9a7.jpg" onClick={goToPubg} className="h-[85%]" alt="Game Logo" />
                        </CarouselItem>
                        <CarouselItem className="flex items-center justify-center">
                            <img src="https://www.sportcal.com/wp-content/uploads/sites/32/2023/05/main645e17a39ff80.png" onClick={goToCs} alt="GoG Logo" />
                        </CarouselItem>
                        <CarouselItem className="flex content-center items-center">
                            <img src="https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_GenshinImpact_miHoYoLimited_S1_2560x1440-91c6cd7312cc2647c3ebccca10f30399" onClick={goToGenshin} className="h-[85%] ml-10" alt="game Logo" />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="explore-socials"></div>
            <div className="explore-section">
            {loading ? (
                <div className="flex">
                    <div className="explore-games grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="explore-game-loading p-4 border rounded-md">
                            <Skeleton className="w-[100px] h-[40px] rounded-full" />
                        </div>
                    </div>
                    <div className="explore-games grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="explore-game-loading p-4 border rounded-md">
                            <Skeleton className="w-[100px] h-[40px] rounded-full" />
                        </div>
                    </div>
                    <div className="explore-games grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="explore-game-loading p-4 border rounded-md">
                            <Skeleton className="w-[100px] h-[40px] rounded-full" />
                        </div>
                    </div>
                    <div className="explore-games grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="explore-game-loading p-4 border rounded-md">
                            <Skeleton className="w-[100px] h-[40px] rounded-full" />
                        </div>
                    </div>
                </div>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="explore-games grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {games.map((game) => (
                    <div key={game.id} className="explore-game p-4 rounded-md">
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
