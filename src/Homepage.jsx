import { useEffect, useState } from "react";
import Pokedex from "./components/Pokedex";

const Homepage = () => {
    // pokedex animation
    const [isPokedexVisible, setIsPokedexVisible] = useState(true);
    const [isPokedexMounted, setIsPokedexMounted] = useState(true);

    useEffect(() => {
        // animation upon website launch
        setIsPokedexVisible(false);
        // hide pokedex after animation
        setTimeout(() => {
            setIsPokedexMounted(false);
        }, 3000);
    }, []);

    return (
        <div className="relative h-screen w-screen bg-LightBlue">
            <Pokedex visibility={isPokedexVisible} mounted={isPokedexMounted} />
            <button onClick={() => { setIsPokedexVisible(false) }} className="cursor-pointer">click me</button>
        </div>
    );
}

export default Homepage;