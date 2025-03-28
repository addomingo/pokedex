import { useEffect, useState } from "react";
import Pokedex from "./components/Pokedex";
import PokemonCard from "./components/PokemonCard";
import Lapras from "./assets/131.png";
import Kirlia from "./assets/Kirlia.png";
import axios from "axios";
import FilterBar from "./components/FilterBar";

const Homepage = () => {
    // pokedex animation
    const [isPokedexVisible, setIsPokedexVisible] = useState(true);
    const [isPokedexMounted, setIsPokedexMounted] = useState(true);

    const [offset, setOffset] = useState(0);
    const [pokemonData, setPokemonData] = useState([]);

    // fetch all pokemon
    const fetchPokemon = async() => {
        await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
        .then((res) => {
            //console.log(res.data);
            //console.log(res.data.results[0]);
            fetchPokemonData(res.data.results);
        })
        .catch((error) => {
            console.error('Error fetching pokemon:', error);
        });
    }

    // fetch all pokemon data; returns an array of all pokemon data
    const fetchPokemonData = async(pokemon) => {
        try {
            // fetch each pokemon data
            const responses = await Promise.all(pokemon.map(pokemon => axios.get(pokemon.url)));

            // store extracted data
            const fetchedPokemonData = responses.map(response => response.data);
            //console.log(fetchedPokemonData);

            // append fetched pokemon data to already stored pokemon data
            const storedData = pokemonData;
            setPokemonData([...storedData, ...fetchedPokemonData]);
        } catch (error) {
            console.error('Error fetching pokemon data:', error);
        }
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
            <div className="flex flex-col h-full w-full p-5">

                <FilterBar />

                <br></br>

                {/* Pokemon Card List View */}
                <div className="h-full flex flex-wrap gap-2 justify-center bg-LighterBlue">
                    { pokemonData.map(pokemonDetails => {
                        return (
                            <PokemonCard key={pokemonDetails.id} data={pokemonDetails} image={Lapras} type="water"/>
                        );
                    })}
                </div>
            </div>

            {/* pokedex animation */}
            <Pokedex visibility={isPokedexVisible} mounted={isPokedexMounted} />
        </div>
    );
}

export default Homepage;