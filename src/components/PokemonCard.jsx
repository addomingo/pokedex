import Lapras from "../assets/131.png";
import Pokeball from "./Pokeball";

const PokemonCard = (props) => {
    const gradientColor = new Map([
        ["water", "#91CAFF"],
        ["bananas", 300],
        ["oranges", 200]
    ]);
    const type = props.type;

    return (
        <div className={`h-[40vh] bg-[#ecf8ff] rounded-3xl drop-shadow-md p-5 bg-linear-[180deg,white_50%,${gradientColor.get(type)}]`}>
            <div className="relative h-full">
                <div className="h-[70%] p-[10%] absolute z-0">
                    <Pokeball color={gradientColor.get(type)}/>
                </div>
                <img src={Lapras} className="h-[70%] aspect-square object-cover relative z-10"/>
            </div>
        </div>
    );
}

export default PokemonCard;