import { EyeOff } from 'lucide-react';
import PokeballIcon from '../assets/Pokeball_Icon.png';

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
        <div className="text-3xl font-semibold text-white w-full p-[3px] sm:p-[2px] rounded-md sm:rounded-lg flex justify-center items-center" style={{ backgroundColor: typeColor.get(type) }}>
            {label}
        </div>
    );
}

// commes with hidden icon if it is a Hidden Ability
const AbilityText = (props) => {
    const name = props.name;
    const isHidden = props.isHidden;

    return (
        <div className="flex gap-2">
            <h2 className={`text-2xl font-semibold ${isHidden ? 'text-GrayHeader' : 'text-GrayBorder'} `}>{name}</h2>
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
            <h4 className="w-4/15 text-md font-bold text-GrayBorder text-center leading-none">{ statLabel.get(statName) }</h4>
            <div className="grow h-[8px] bg-GrayHeader">
                <hr className={`h-full border-none`} style={{ width: `${barValue}%`, backgroundColor: typeColor.get(pokemonType) }}/>
            </div>
        </div>
    );
}

const InfoModal = (props) => {
    const types = ['water', 'ice'];
    const id = 2;
    const imageID = id.toString().padStart(3, '0');
    const displayID = id.toString().padStart(4, '0');
    const name = 'Lapras';
    const category = 'Transport Pokemon';
    const weaknessList = ['grass', 'electric', 'fighting', 'rock'];
    const height = '2.5m';
    const weight = '220.0kg';
    const abilities = [
        { name: 'Water Absorb', isHidden: false },
        { name: 'Shell Armor', isHidden: false },
        { name: 'Hydration', isHidden: true }
    ];
    const stats = [
        {
          "base_stat": 130,
          "effort": 2,
          "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
          }
        },
        {
          "base_stat": 85,
          "effort": 0,
          "stat": {
            "name": "attack",
            "url": "https://pokeapi.co/api/v2/stat/2/"
          }
        },
        {
          "base_stat": 80,
          "effort": 0,
          "stat": {
            "name": "defense",
            "url": "https://pokeapi.co/api/v2/stat/3/"
          }
        },
        {
          "base_stat": 85,
          "effort": 0,
          "stat": {
            "name": "special-attack",
            "url": "https://pokeapi.co/api/v2/stat/4/"
          }
        },
        {
          "base_stat": 95,
          "effort": 0,
          "stat": {
            "name": "special-defense",
            "url": "https://pokeapi.co/api/v2/stat/5/"
          }
        },
        {
          "base_stat": 60,
          "effort": 0,
          "stat": {
            "name": "speed",
            "url": "https://pokeapi.co/api/v2/stat/6/"
          }
        }
    ];

    const shadowStyle = 'shadow-[15px_15px_4px_#bfbfbf]';

    return (
        <dialog id={props.id} className="modal">
            <div className="modal-box w-full max-w-[75vw] flex p-0">
                {/* pokemon image */}
                <div className="h-[75%] flex-1 bg-blue-100"></div>
                
                {/* pokemon information */}
                <div className="flex-1 my-5 ml-5 mr-8">
                    
                    <div className={`flex-1 flex-col border border-3 rounded-xl border-GrayBorder overflow-hidden ${shadowStyle}`}>
                        {/* pokemon ID number and name */}
                        <div className="flex gap-2 px-4 py-2" style={{ backgroundColor: typeColor.get(types[0]) }}>
                        <img src={PokeballIcon} className="h-8 flex-none aspect-square rounded-full m-[3px] border border-white border-3"/>
                            <h1 className="flex-none text-3xl font-bold text-white">{displayID}</h1>
                            <h1 className="flex-grow text-3xl font-bold text-white pl-10">{name}</h1>
                        </div>
                        {/* pokemon category */}
                        <div className="bg-white flex justify-end px-4 py-2">
                            <h2 className="text-2xl font-semibold text-GrayBorder">{category}</h2>
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
                            <div className="bg-white flex flex-col p-4 gap-2">
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
                                { types.map((type, index) => {
                                    return (
                                        <PokemonTypeLabel key={index} type={type}/>
                                    );
                                })}
                            </div>
                            {/* height and weight box */}
                            <div className={`flex-col border border-3 rounded-xl border-GrayBorder overflow-hidden ${shadowStyle}`}>
                                <div className="bg-white flex px-10 py-2 gap-2">
                                    <h2 className="flex-none text-2xl font-semibold text-GrayBorder">Height</h2>
                                    <h2 className="grow text-center text-2xl font-semibold text-GrayBorder">{height}</h2>
                                </div>
                                <hr className="border-t-5 border-dashed border-[#9EA7AA]"></hr>
                                <div className="bg-white flex px-10 py-2 gap-2">
                                    <h2 className="flex-none text-2xl font-semibold text-GrayBorder">Weight</h2>
                                    <h2 className="grow text-center text-2xl font-semibold text-GrayBorder">{weight}</h2>
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
                            <div className="bg-white flex flex-col p-4 gap-2 justify-center items-center">
                                { abilities.map((ability, index) => {
                                    return (
                                        <AbilityText key={index} name={ability.name} isHidden={ability.isHidden}/>
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
                                        <StatBarAndLabel key={index} statName={stat.stat.name} value={stat.base_stat} pokemonType={types[0]} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>


                </div>


                {/* <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div> */}
            </div>
        </dialog>
    );
}

export default InfoModal;