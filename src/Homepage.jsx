import { useEffect, useState } from "react";
import Pokedex from "./components/Pokedex";
import PokemonCard from "./components/PokemonCard";
import Lapras from "./assets/131.png";
import Kirlia from "./assets/Kirlia.png";
import axios from "axios";
import FilterBar from "./components/FilterBar";
import InfoModal from "./components/InfoModal";

const Homepage = () => {
    // pokedex animation
    const [isPokedexVisible, setIsPokedexVisible] = useState(true);
    const [isPokedexMounted, setIsPokedexMounted] = useState(true);

    const [offset, setOffset] = useState(0);
    const [pokemonData, setPokemonData] = useState([]);
    
    // Detailed Info View Modal information
    const InfoModalID = 'pokemon_info_modal';
    const [currentPokemonIDInModal, setCurrentPokemonIDInModal] = useState(0);

    // function passed to PokemonCard that is evoked when card is clicked
    // changes the pokemonID in the modal to the ID of the selected pokemon
    // also passed to InfoModal and is evoked when Previous, Next, or Close button is clicked
    const handleChangePokemonIDInModal = (pokemonID) => {
        setCurrentPokemonIDInModal(pokemonID);
        console.log(currentPokemonIDInModal);
        return;
    }

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

                <button className="btn" onClick={()=>document.getElementById(InfoModalID).showModal()}>open modal</button>

                <br></br>

                {/* Pokemon Card List View */}
                <div className="h-full relative flex flex-wrap gap-2 justify-center items-center bg-LighterBlue rounded-lg p-5">
                    {/* pokemon cards mapping */}
                    { pokemonData.map(pokemonDetails => {
                        return (
                            <PokemonCard key={pokemonDetails.id} data={pokemonDetails} image={Lapras} type="water" changeIDFunction={handleChangePokemonIDInModal}/>
                        );
                    })}

                    {/* decorations, TLRB */}
                    <div className="absolute top-0 h-2 w-[calc(100%-200px)] bg-LightBlue rounded-b-lg"/>
                    <div className="absolute left-0 h-[calc(100%-200px)] w-2 bg-LightBlue rounded-r-lg"/>
                    <div className="absolute right-0 h-[calc(100%-200px)] w-2 bg-LightBlue rounded-l-lg"/>
                    <div className="absolute bottom-0 h-2 w-[calc(100%-200px)] bg-LightBlue rounded-t-lg"/>
                </div>
            </div>

            {/* detailed info pop up */}
            {/* modal only renders if pokemonID is valid/exists */}
            {(currentPokemonIDInModal != 0) && <InfoModal id={InfoModalID} pokemonID={currentPokemonIDInModal} changeIDFunction={handleChangePokemonIDInModal}/>}

            {/* pokedex animation */}
            <Pokedex visibility={isPokedexVisible} mounted={isPokedexMounted} />
        </div>
    );
}

export default Homepage;