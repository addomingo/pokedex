import Pokeball from "./Pokeball";

const TypeLabel = (props) => {
    const labelColor = new Map([
        ["water", "#0284FE"],
        ["grass", "#91FF95"],
        ["oranges", 200]
    ]);
    const label = new Map([
        ["water", "Water"],
        ["grass", "Grass"],
        ["oranges", 200]
    ]);
    const type = props.type;

    return (
        <div className="text-sm font-semibold text-white w-25 p-[2px] rounded-lg flex justify-center items-center" style={{ backgroundColor: labelColor.get(type) }}>
            {label.get(type)}
        </div>
    );
}

const PokemonCard = (props) => {
    const gradientColor = new Map([
        ["water", "#91CAFF"],
        ["grass", "#91FF95"],
        ["oranges", 200]
    ]);
    const type = props.type;

    return (
        <div className={`h-[35vh] sm:h-[40vh] bg-[#ecf8ff] rounded-3xl drop-shadow-md p-5 bg-linear-[180deg,white_50%,${gradientColor.get(type)}] cursor-pointer`}>
            <div className="flex justify-end gap-[2px]">
                <h2 className="text-sm font-extrabold text-BlackText leading-none">No</h2>
                <h1 className="text-2xl font-bold text-BlackText leading-none">0131</h1>
            </div>
            <div className="relative h-[70%]">
                <div className="h-full p-[10%] absolute z-0">
                    <Pokeball color={gradientColor.get(type)}/>
                </div>
                <img src={props.image} className="h-full aspect-square object-cover relative z-10"/>
            </div>
            <h1 className="text-3xl font-bold text-BlackText">Lapras</h1>
            <div className="flex">
                <TypeLabel type="water" />
            </div>
        </div>
    );
}

export default PokemonCard;