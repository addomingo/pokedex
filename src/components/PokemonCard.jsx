import Pokeball from "./Pokeball";

const TypeLabel = (props) => {
    const labelColor = new Map([
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
    const type = props.type;
    // capitalized type
    const label = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className="text-xs sm:text-sm font-semibold text-white w-22 p-[3px] sm:p-[2px] rounded-md sm:rounded-lg flex justify-center items-center" style={{ backgroundColor: labelColor.get(type) }}>
            {label}
        </div>
    );
}

const PokemonCard = (props) => {
    const gradientColor = new Map([
        ["normal", "#cccdcc"],
        ["fire", "#f28786"],
        ["fighting", "#ffbc79"],
        ["water", "#91CAFF"],
        ["flying", "#c2dcf7"],
        ["grass", "#91FF95"],
        ["poison", "#cca5e7"],
        ["electric", "#ffe89d"],
        ["ground", "#e5b38e"],
        ["psychic", "#ee4179"],
        ["rock", "#ccc9b0"],
        ["ice", "#a3e8f7"],
        ["bug", "#d7e668"],
        ["dragon", "#98a1ed"],
        ["ghost", "#c193c1"],
        ["dark", "#a99293"],
        ["steel", "#a4c9d6"],
        ["fairy", "#f6b4f6"],
        ["stellar", "#9bdcd3"]
    ]);

    const pokemon = props.data;
    const id = pokemon.id;
    const imageID = id.toString().padStart(3, '0');
    const displayID = id.toString().padStart(4, '0');
    const name = (pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1); // capitalize pokemon name
    const types = pokemon.types;
    const mainType = types[0].type.name;
 
    return (
        <div className="h-75 sm:h-90 bg-[#ecf8ff] rounded-3xl drop-shadow-md pt-4 pb-5 px-5 cursor-pointer" style={{ 
            background: `linear-gradient(180deg, white 50%, ${gradientColor.get(mainType)})`,
            backgroundColor: '#ecf8ff' // fallback background color if gradient doesn't load
        }}>
            {/* pokemon number */}
            <div className="flex justify-end gap-[2px]">
                <h2 className="text-xs sm:text-sm font-extrabold text-BlackText leading-none">No</h2>
                <h1 className="text-xl sm:text-2xl font-bold text-BlackText leading-none">{displayID}</h1>
            </div>
            {/* pokemon image */}
            <div className="relative h-[70%]">
                <div className="h-full p-[5%] absolute z-0">
                    <Pokeball color={gradientColor.get(mainType)}/>
                </div>
                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageID}.png`}
                    className="h-full aspect-square object-cover relative z-10"/>
            </div>
            {/* pokemon name and type tags */}
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-BlackText mb-3">{name}</h1>
                {/* type label/tags */}
                <div className="flex gap-1">
                    { types.map((typeInfo, index) => {
                        return (
                            <TypeLabel key={index} type={typeInfo.type.name} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;