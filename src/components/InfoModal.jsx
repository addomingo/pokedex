import { CircleX, EyeOff} from 'lucide-react';
import PokeballIcon from '../assets/Pokeball_Icon.png';
import Pokeball from '../components/Pokeball.jsx';
import { useEffect, useState } from 'react';
import getWeaknesses from './Weaknesses.js';
import ImageUnavailable from "../assets/ImageUnavailable.png";
import axios from 'axios';

const typeColor = new Map([
    ["normal", "#9fa19e"],
    ["fire", "#e72726"],
    ["fighting", "#fe7e00"],
    ["water", "#2981ef"],
    ["flying", "#81b8ee"],
    ["grass", "#3fa12a"],
    ["poison", "#9241cc"],
    ["electric", "#fabf00"],
    ["ground", "#915121"],
    ["psychic", "#ee4179"],
    ["rock", "#aea981"],
    ["ice", "#3ccfee"],
    ["bug", "#91a11b"],
    ["dragon", "#5160e1"],
    ["ghost", "#704070"],
    ["dark", "#614d4e"],
    ["steel", "#60a1b7"],
    ["fairy", "#ee70ee"],
    ["stellar", "#40b5a5"]
]);

// placed in weakness box
const WeaknessTypeLabel = (props) => {
    const type = props.type;
    // capitalized type
    const label = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className="text-xs sm:text-sm font-semibold text-white w-full p-[3px] sm:p-[2px] rounded-md sm:rounded-lg flex justify-center items-center" style={{ backgroundColor: typeColor.get(type) }}>
            {label}
        </div>
    );
}

const PokemonTypeLabel = (props) => {
    const type = props.type;
    // capitalized type
    const label = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className="text-2xl lg:text-3xl font-semibold text-white w-full p-[3px] sm:p-[2px] rounded-md sm:rounded-lg flex justify-center items-center" style={{ backgroundColor: typeColor.get(type) }}>
            {label}
        </div>
    );
}

// commes with hidden icon if it is a Hidden Ability
const AbilityText = (props) => {
    const name = (props.name).charAt(0).toUpperCase() + (props.name).slice(1);
    const isHidden = props.isHidden;

    return (
        <div className="flex gap-2">
            <h2 className={`text-xl lg:text-2xl font-semibold ${isHidden ? 'text-GrayHeader' : 'text-GrayBorder'} `}>{name}</h2>
            { isHidden && <EyeOff style={{ color: '#C6C6C6' }}/> }
        </div>
    );
}

const StatBarAndLabel = (props) => {
    const statLabel = new Map([
        ["hp", "HP"],
        ["attack", "ATK"],
        ["defense", "DEF"],
        ["special-attack", "S.ATK"],
        ["special-defense", "S.DEF"],
        ["speed", "SPD"]
    ]);
    const statName = props.statName;
    const value = props.value;
    const maxvalue = (statName == 'hp') ? (value*2)+204 : (value*2+99 )*1.1;
    const barValue = Math.trunc((value/maxvalue)*100);
    const pokemonType = props.pokemonType;

    return (
        <div className="flex gap-2 items-center">
            <h4 className="w-4/15 text-sm lg:text-md font-bold text-GrayBorder text-center leading-none">{ statLabel.get(statName) }</h4>
            <div className="grow h-[7px] lg:h-[8px] bg-GrayHeader">
                <hr className={`h-full border-none`} style={{ width: `${barValue}%`, backgroundColor: typeColor.get(pokemonType) }}/>
            </div>
        </div>
    );
}

const PreviousButton = (props) => {10277
    const prevID = props.prevID;

    return (
        <button className={`absolute -top-5 lg:-top-15 -left-12 font-bold text-LessHarshBlack text-start cursor-pointer ${(prevID >= 1) ? '' : 'hidden'} focus:outline-none`}
            onClick={props.onClick}
        >
            <div className="flex">
                <div className="pl-5 bg-white border-LessHarshBlack border-l-5 border-t-5 border-b-5 rounded-l-full"></div>
                <div className="py-5 pl-5 pr-15 bg-white border-LessHarshBlack min-w-45 border-r-5 border-t-5 border-b-5 rounded-br-full">
                    <h1 className="text-2xl lg:text-3xl leading-none">Previous</h1>
                    <h3 className="text-lg lg:text-xl leading-none">{prevID.toString().padStart(4, '0')}</h3>
                </div>
            </div>
        </button>
    );
}

const NextButton = (props) => {
    const nextID = props.nextID;

    return (
        <button className={`absolute -top-5 lg:-top-15 -right-12 font-bold text-LessHarshBlack text-end cursor-pointer focus:outline-none ${(nextID > 10277) ? 'hidden' : ''}`}
            onClick={props.onClick}
        >
            <div className="flex">
                <div className="py-5 pl-15 pr-13 border-LessHarshBlack bg-white min-w-45 border-l-5 border-t-5 border-b-5 rounded-bl-full">
                    <h1 className="text-2xl lg:text-3xl leading-none">Next</h1>
                    <h3 className="text-lg lg:text-xl leading-none">{nextID.toString().padStart(4, '0')}</h3>
                </div>
                <div className="pl-5 bg-white border-LessHarshBlack border-r-5 border-t-5 border-b-5 rounded-r-full"></div>
            </div>
        </button>
    );
}

const CloseButton = (props) => {
    return (
        <button 
            className="absolute -bottom-5 flex gap-2 bg-white border-LessHarshBlack border-3 py-2 px-5 rounded-xl justify-center items-center cursor-pointer focus:outline-none self-center"
            onClick={()=>document.getElementById(props.modalID).close()}
        >
            <h3 className="text-xl font-semibold text-LessHarshBlack">Close</h3>
            <CircleX style={{ color: '#303030' }}/>
        </button>
    );
}

const InfoModal = (props) => {
    const modalID = props.id;
    const id = props.pokemonID;
    const imageID = id.toString().padStart(3, '0');
    const [pokemonData, setPokemonData] = useState(null);
    const displayID = id.toString().padStart(4, '0');

    // provide default values to prevent errors (format similar to PokeAPI response data)
    const [name, setName] = useState('Pokemon_Name');
    const [category, setCategory] = useState('Pokemon_Category'); // !!!! fetch this !!!!
    const [types, setTypes] = useState([{ type: { name: 'unknown' } }]);
    const [weaknessList, setWeaknessList] = useState(['']);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [abilities, setAbilities] = useState([{ ability: { name: 'unknown' }, is_hidden: false }]);
    const [stats, setStats] = useState([{ stat: { name: 'unknown' }, base_stat: 0 }]);

    // fetch specific pokemon data whenever pokemonID in modal is changed
    useEffect(() => {
        const fetchPokemonData = async() => {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then((res) => {
                //console.log(res.data);
                setPokemonData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching pokemon:', error);
            });
        }
        // checker ensures fetch does not happen when id==0 to prevent error (since pokemon ID=0 does not exist in API)
        if (id != 0){
            fetchPokemonData();
        }
    }, [id]);

    // update values when pokemonData is changed
    // this changes the default values of the needed fields
    useEffect(() => {
        // fetch Pokemon Category from link in pokemonData.species -> genera.genus where genera.language=="en"
        function englishCategory(generaElement) {
            return generaElement.language.name === "en";
        }
        const fetchPokemonCategory = async(url) => {
            await axios.get(url)
            .then((res) => {
                //console.log(res.data);
                const categoryEnglishVersion = (res.data.genera).filter(englishCategory);
                //console.log(categoryEnglishVersion);
                setCategory(categoryEnglishVersion[0].genus);

            })
            .catch((error) => {
                console.error('Error fetching pokemon:', error);
            });
        }
        if (pokemonData) {
            console.log(pokemonData);
            setName((pokemonData.name).charAt(0).toUpperCase() + (pokemonData.name).slice(1));
            setTypes(pokemonData.types);                        // to access: types[0].type.name
            fetchPokemonCategory(pokemonData.species.url);      // fetch pokemon category
            setWeaknessList(getWeaknesses(pokemonData.types));  // derive weaknesses from types
            setHeight((pokemonData.height/10).toFixed(1));
            setWeight((pokemonData.weight/10).toFixed(1));
            setAbilities(pokemonData.abilities);                // to access: abilities[0].ability.name && abilities[0].is_hidden
            setStats(pokemonData.stats);                        // to access: stats[0].stat.name && abilities[0].base_stat
        }
    }, [pokemonData]);

    // related values
    const prevID = id-1;
    const nextID = id+1;

    const shadowStyle = 'shadow-[15px_15px_4px_#bfbfbf]';

    return (
        <dialog id={props.id} className="modal">
            <div className="modal-box w-full max-w-[75vw] relative flex flex-col lg:flex-row p-0 overflow-visible justify-center">
                
                <PreviousButton prevID={prevID} onClick={()=>{props.changeIDFunction(prevID)}}/>
                <NextButton nextID={nextID} onClick={()=>{props.changeIDFunction(nextID)}}/>
                <CloseButton modalID={modalID}/>

                {/* pokemon image */}
                <div className="flex-1 relative flex justify-center -z-10 items-center">
                    <img 
                        src={(id > 1025)? ImageUnavailable : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageID}.png`} 
                        className={`max-h-[75%] max-w-[250px] lg:max-w-full aspect-square ${(id > 1025)? 'opacity-50' : ''}`} style={{ animation: 'bounce-pokemon 10s infinite' }}
                    />
                    {/* spinning pokeballs */}
                    <div className="h-full w-full -z-10 absolute top-0 overflow-hidden">
                        <Pokeball color={typeColor.get(types[0].type.name)} className="absolute -left-35 -bottom-35 opacity-30" style={{ animation: 'spin infinite 20s linear' }}/>
                    </div>
                    <div className="h-[70%] w-full -z-10 absolute top-0 -right-35 overflow-hidden">
                        <div className="relative h-full w-full">
                            <Pokeball color={typeColor.get(types[0].type.name)} className="absolute -top-35 right-0 opacity-30" style={{ animation: 'spin infinite 10s linear' }}/>
                        </div>
                    </div>
                </div>
                
                {/* pokemon information */}
                <div className="flex-1 my-5 ml-5 mr-8">
                    
                    <div className={`flex-1 flex-col border border-3 rounded-xl border-GrayBorder overflow-hidden ${shadowStyle}`}>
                        {/* pokemon ID number and name */}
                        <div className="flex gap-2 px-4 py-2" style={{ backgroundColor: typeColor.get(types[0].type.name) }}>
                            <img src={PokeballIcon} className="h-6 lg:h-8 flex-none aspect-square rounded-full m-[3px] border border-white border-3"/>
                            <h1 className="flex-none text-2xl lg:text-3xl font-bold text-white">{displayID}</h1>
                            <h1 className="flex-grow text-2xl lg:text-3xl font-bold text-white pl-10">{name}</h1>
                        </div>
                        {/* pokemon category */}
                        <div className="bg-white flex justify-end px-4 py-2">
                            <h2 className="text-xl lg:text-2xl font-semibold text-GrayBorder">{category}</h2>
                        </div>
                    </div>
                    <br></br>
                    <div className="flex gap-6">
                        {/* weaknesses box */}
                        <div className={`flex-1/3 flex-col border border-3 rounded-xl border-GrayBorder overflow-hidden ${shadowStyle}`}>
                            <div className="flex gap-2 px-4 py-1 bg-GrayBorder justify-center">
                                <h4 className="text-sm font-bold text-white">Weaknesses</h4>
                            </div>
                            {/* weakness type list */}
                            <div className="bg-white h-35 lg:h-40 flex flex-col overflow-y-auto p-4 gap-2">
                                { weaknessList.map((weaknessType, index) => {
                                    return (
                                        <WeaknessTypeLabel key={index} type={weaknessType}/>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div className="flex-2/3 flex flex-col gap-5">
                            {/* type label/s */}
                            <div className="flex grow gap-3 pt-3 pr-7">
                                { types.map((typeElement, index) => {
                                    return (
                                        <PokemonTypeLabel key={index} type={typeElement.type.name}/>
                                    );
                                })}
                            </div>
                            {/* height and weight box */}
                            <div className={`flex-col border border-3 rounded-xl border-GrayBorder overflow-hidden ${shadowStyle}`}>
                                <div className="bg-white flex px-10 py-2 gap-2">
                                    <h2 className="flex-none text-xl lg:text-2xl font-semibold text-GrayBorder">Height</h2>
                                    <h2 className="grow text-center text-xl lg:text-2xl font-semibold text-GrayBorder">{`${height}m`}</h2>
                                </div>
                                <hr className="border-t-5 border-dashed border-[#9EA7AA]"></hr>
                                <div className="bg-white flex px-10 py-2 gap-2">
                                    <h2 className="flex-none text-xl lg:text-2xl font-semibold text-GrayBorder">Weight</h2>
                                    <h2 className="grow text-center text-xl lg:text-2xl font-semibold text-GrayBorder">{`${weight} kg`}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="flex gap-6">
                        {/* abilities box */}
                        <div className={`flex-1/2 flex-col border border-3 rounded-xl border-GrayBorder overflow-hidden ${shadowStyle}`}>
                            <div className="flex gap-2 px-4 py-1 bg-GrayHeader justify-center">
                                <h4 className="text-sm font-bold text-white">Abilities</h4>
                            </div>
                            {/* ablities list */}
                            <div className="bg-white flex flex-col p-3 gap-2 justify-center items-center">
                                { abilities.map((abilityElement, index) => {
                                    return (
                                        <AbilityText key={index} name={abilityElement.ability.name} isHidden={abilityElement.is_hidden}/>
                                    );
                                })}
                            </div>
                        </div>

                        {/* status box */}
                        <div className={`flex-1/2 flex-col border border-3 rounded-xl border-GrayBorder overflow-hidden ${shadowStyle}`}>
                            <div className="flex gap-2 px-4 py-1 bg-GrayHeader justify-center">
                                <h4 className="text-sm font-bold text-white">Stats</h4>
                            </div>
                            {/* stat list and values */}
                            <div className="bg-white flex flex-col py-3 pl-2 pr-4 gap-1">
                                { stats.map((stat, index) => {
                                    return (
                                        <StatBarAndLabel key={index} statName={stat.stat.name} value={stat.base_stat} pokemonType={types[0].type.name} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <br></br>

                </div>
            </div>
            {/* required in daisyUI to close modal when clicked outside */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default InfoModal;