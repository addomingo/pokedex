import { useEffect, useState } from "react";
import Pokedex from "./components/Pokedex";
import PokemonCard from "./components/PokemonCard";
import Lapras from "./assets/131.png";
import Kirlia from "./assets/Kirlia.png";
import axios from "axios";

const Homepage = () => {
    // pokedex animation
    const [isPokedexVisible, setIsPokedexVisible] = useState(true);
    const [isPokedexMounted, setIsPokedexMounted] = useState(true);

    // fetch all pokemon
    const fetchPokemon = async() => {
        await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then((res) => {
            console.log(res.data);
            console.log(res.data.results);
            //setProducts(res.data);
        })
        .catch((error) => {
            console.error('Error fetching pokemon:', error);
        });
    }


    useEffect(() => {
        // animation upon website launch
        setTimeout(() => {
            setIsPokedexVisible(false);
        }, 500);
        // hide pokedex after animation
        setTimeout(() => {
            setIsPokedexMounted(false);
        }, 3500);

        fetchPokemon();
    }, []);

    return (
        <div className={`relative min-h-screen min-w-screen bg-LightBlue ${isPokedexMounted ? 'overflow-hidden' : ''}`}>
            {/* main page */}
            <div className="flex h-full w-full">

                {/* Pokemon Card List View */}
                <div className="h-full w-full flex flex-wrap gap-2">
                    <PokemonCard image={Lapras} type="water"/>
                    <PokemonCard image={Kirlia} type="grass"/>
                    <PokemonCard image={Lapras} type="dark"/>
                    <PokemonCard image={Kirlia} type="steel"/>
                    <PokemonCard image={Lapras} type="fairy"/>
                    <PokemonCard image={Kirlia} type="stellar"/>
                </div>
            </div>

            {/* pokedex animation */}
            <Pokedex visibility={isPokedexVisible} mounted={isPokedexMounted} />
        </div>
    );
}

export default Homepage;