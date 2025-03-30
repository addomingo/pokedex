import { useEffect, useState } from "react";
import Pokedex from "./components/Pokedex";
import PokemonCard from "./components/PokemonCard";
import Lapras from "./assets/131.png";
import Pokeball from "./assets/Pokeball_Icon.png";
import axios from "axios";
import FilterBar from "./components/FilterBar";
import InfoModal from "./components/InfoModal";

const LoadMoreButton = (props) => {
    return (
        <button className={`border-3 p-3 rounded-xl bg-white cursor-pointer ${props.className}`} onClick={props.onClick}>
            Load More Pokemon
        </button>
    );
}

const LoadingPokeball = (props) => {
    return (
        <div className={`h-5 w-5 ${props.isLoadingVisible ? '' : 'hidden'}`}>
            <img src={Pokeball} className="h-full aspect-square animate-spin"/>
        </div>
    );
}

const Homepage = () => {
    // pokedex animation
    const [isPokedexVisible, setIsPokedexVisible] = useState(true);
    const [isPokedexMounted, setIsPokedexMounted] = useState(true);

    // loading indicator
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);

    const [allPokemon, setAllPokemon] = useState([]);
    const [loadStartIndex, setLoadStartIndex] = useState(0); // for loading pokemon by 10's
    const [loadEndIndex, setLoadEndIndex] = useState(10);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [pokemonData, setPokemonData] = useState([]); // pokemon data whose information is fetched

    // filtering and sorting
    const [searchBarValue, setSearchBarValue] = useState('');
    
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

    // increment by 10
    const handleLoadMorePokemon = () => {
        setLoadStartIndex(loadStartIndex + 10);
        setLoadEndIndex(loadEndIndex + 10);
    }

    // fetch all pokemon (name and url only)
    // initial set of data
    const fetchPokemon = async() => {
        await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then((res) => {
            //console.log(res.data);
            //console.log(res.data.results);
            setAllPokemon(res.data.results);
            setFilteredPokemon(res.data.results);
            fetchPokemonData(res.data.results);
        })
        .catch((error) => {
            console.error('Error fetching pokemon:', error);
        });
    }

    // fetch pokemon data; returns an array of pokemon data
    const fetchPokemonData = async(pokemonArray, resetPokemonData) => {
        try {
            setIsLoadingVisible(true);
            console.log(pokemonArray);

            // fetch each pokemon data
            const responses = await Promise.all(pokemonArray.map((pokemon, index) => {
                // only fetch data by 10's
                if ((index >= loadStartIndex) && (index < loadEndIndex)){
                    return axios.get(pokemon.url);
                } else {
                    return null;
                }
            }));

            // store extracted data and filter out null responses
            const fetchedPokemonData = responses.filter((response) => {return response !== null}).map(response => response.data);
            //console.log(fetchedPokemonData);

            // append fetched pokemon data to already stored pokemon data
            const storedData = (resetPokemonData) ? [] : pokemonData;
            setPokemonData([...storedData, ...fetchedPokemonData]);
        } catch (error) {
            console.error('Error fetching pokemon data:', error);
        } finally {
            setIsLoadingVisible(false);
        }
    }

    const sortAndFilterPokemon = () => {
        function checkMatchingNameOrID(pokemon, searchBarValue) {
            return ((pokemon.name.includes(searchBarValue))) || (pokemon.url.split("/")[6]).includes(searchBarValue);
        }
        const filteredPokemon = allPokemon.filter((pokemon) => checkMatchingNameOrID(pokemon, searchBarValue));
        return filteredPokemon;
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

    // when load more pokemon button is clicked
    useEffect(() => {
        //fetchPokemonData(allPokemon);
        fetchPokemonData(sortAndFilterPokemon(), false);
    }, [loadStartIndex, loadEndIndex]);

    // whenever search is clicked
    const handleSearch = () => {
        setLoadStartIndex(0);
        setLoadEndIndex(10);
        //setPokemonData([]);
        fetchPokemonData(sortAndFilterPokemon(), true);
    }

    // useEffect(() => {
    //     //fetchPokemonData(allPokemon);
    //     handleSearch();
    // }, [searchBarValue]);


    return (
        <div className={`relative min-h-screen min-w-screen bg-LightBlue ${isPokedexMounted ? 'overflow-hidden' : ''}`}>
            {/* main page */}
            <div className="flex flex-col h-full w-full p-5">

                <FilterBar 
                    searchValue={searchBarValue} 
                    onChange={(e) => setSearchBarValue(e.target.value)}
                    onSearchClick={handleSearch}
                />

                <br></br>

                {/* Pokemon Card List View */}
                <div className="h-full relative flex flex-col gap-5 justify-center items-center bg-LighterBlue rounded-lg p-5">
                    <div className="h-full flex flex-wrap gap-2 justify-center items-center">
                        {/* pokemon cards mapping */}
                        { pokemonData.map((pokemonDetails, index) => {
                            return (
                                <PokemonCard key={index} data={pokemonDetails} image={Lapras} type="water" 
                                    changeIDFunction={handleChangePokemonIDInModal}
                                    openModal={()=>{document.getElementById(InfoModalID).showModal()}}
                                />
                            );
                        })}
                    </div>

                    <LoadingPokeball isLoadingVisible={isLoadingVisible}/>

                    {/* decorations, TLRB */}
                    <div className="absolute top-0 h-2 w-[calc(100%-200px)] bg-LightBlue rounded-b-lg"/>
                    <div className="absolute left-0 h-[calc(100%-200px)] w-2 bg-LightBlue rounded-r-lg"/>
                    <div className="absolute right-0 h-[calc(100%-200px)] w-2 bg-LightBlue rounded-l-lg"/>
                    <div className="absolute bottom-0 h-2 w-[calc(100%-200px)] bg-LightBlue rounded-t-lg"/>
                </div>

                <LoadMoreButton className="place-self-center" onClick={handleLoadMorePokemon}/>
            </div>

            {/* detailed info pop up */}
            <InfoModal id={InfoModalID} pokemonID={currentPokemonIDInModal} changeIDFunction={handleChangePokemonIDInModal} />

            {/* pokedex animation */}
            <Pokedex visibility={isPokedexVisible} mounted={isPokedexMounted} />
        </div>
    );
}

export default Homepage;