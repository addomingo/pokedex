import { useEffect, useState } from "react";
import Pokedex from "./components/Pokedex";
import PokemonCard from "./components/PokemonCard";

const Homepage = () => {
    // pokedex animation
    const [isPokedexVisible, setIsPokedexVisible] = useState(true);
    const [isPokedexMounted, setIsPokedexMounted] = useState(true);

    useEffect(() => {
        // animation upon website launch
        setTimeout(() => {
            setIsPokedexVisible(false);
        }, 500);
        // hide pokedex after animation
        setTimeout(() => {
            setIsPokedexMounted(false);
        }, 3500);
    }, []);

    return (
        <div className="relative min-h-screen min-w-screen bg-LightBlue">
            <Pokedex visibility={isPokedexVisible} mounted={isPokedexMounted} />

            {/* main page */}
            <div className="flex h-full w-full">

                {/* Pokemon Card List View */}
                <div className="h-full w-full flex flex-wrap gap-2">
                    <PokemonCard type="water"/>
                    <PokemonCard type="water"/>
                    <PokemonCard type="water"/>
                    <PokemonCard type="water"/>
                    <PokemonCard type="water"/>
                    <PokemonCard type="water"/>
                </div>
            </div>
        </div>
    );
}

export default Homepage;