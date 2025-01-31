/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import "./styles.css"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

interface Props {
    params: Promise<{ gameId: string }>;
}

export default function GameId({ params }: Props) {
    const [gameId, setGameId] = useState<string>("1");
    const [game, setGame] = useState<unknown>({});
    const [gameRequirements, setGameRequirements] = useState<unknown>({});
    const router = useRouter();

    const handleClick = () => {
        router.push(`/games/${gameId}/reviewId`);
    };

    useEffect(() => {
        async function unwrapParams() {
            const resolvedParams = await params;
            console.log("Hello World");
            console.log(resolvedParams.gameId);
            setGameId(resolvedParams.gameId);
        }

        unwrapParams();
    }, [params]);

    useEffect(() => {
        async function getGame(gameId: string) {
            fetch(`https://www.freetogame.com/api/game?id=${gameId}`)
            .then((data) => data.json())
            .then((data) => {
                setGame(data);
                setGameRequirements(data.minimum_system_requirements);
            })
        };
        
        getGame(gameId);
    }, [gameId]);

    if (!gameId || !game) {
        return <div>Loading...</div>; // Optional loading state while params are being resolved
    }

    return(
        <div className="w-full flex flex-col mb-10">
            <div className="game-screenshots">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className=""
                >
                    <CarouselContent className="h-[50%]">
                        {game?.screenshots?.length ? (
                            game.screenshots.map((element: any) => (
                                <CarouselItem key={element.id} className="flex items-center justify-center">
                                    <img src={element.image} className="h-[75%]" alt="Game Screenshot" />
                                </CarouselItem>
                            ))
                        ) : (
                            <p>No screenshots available</p>
                        )}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-10 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full" />
                    <CarouselNext className="absolute top-1/2 right-10 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full" />
                </Carousel>
            </div>

            <div className="lhs">
                <div className="game-image">
                    <img src={game.thumbnail} alt="" />
                </div>
            </div>

            <div className="rhs">
                <div className="game-information mt-5">
                    <h1 className="font-bold text-xl">Title</h1>
                    <h1>{game.title}</h1>
                    <h4 className="font-bold text-xl mt-2">Game Description</h4>
                    <p>{game.description}</p>
                    <h5 className="font-bold text-xl mt-2">Genre</h5>
                    <p>{game.genre}</p>
                    <h5 className="font-bold text-xl mt-2">Platform</h5>
                    <p>{game.platform}</p>
                    <h5 className="font-bold text-xl mt-2">Publisher</h5>
                    <p>{game.publisher}</p>
                    <h5 className="font-bold text-xl mt-2">Developer</h5>
                    <p>{game.developer}</p>
                    <h5 className="font-bold text-xl mt-2">Release Date</h5>
                    <p>{game.release_date}</p>
                </div>

                <div className="minimum-requirements">
                    <h1 className="font-bold text-3xl mt-8">System Requirements</h1>
                    <ul className="mt-4 space-y-2">
                        <li>
                            <strong>Operating System:</strong> {gameRequirements.os}
                        </li>
                        <li>
                            <strong>Processor:</strong> {gameRequirements.processor}
                        </li>
                        <li>
                            <strong>Memory:</strong> {gameRequirements.memory}
                        </li>
                        <li>
                            <strong>Graphics:</strong> {gameRequirements.graphics}
                        </li>
                        <li>
                            <strong>Storage:</strong> {gameRequirements.storage}
                        </li>
                    </ul>
                </div>
                    <Button variant="outline" className="review-button h-20 w-[15rem] mt-11 text-lg" onClick={handleClick}>Reviews</Button>
            </div>
        </div>
    );
}
