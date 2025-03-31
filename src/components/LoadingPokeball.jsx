import Pokeball from "../assets/Pokeball_Icon.png";

const LoadingPokeball = (props) => {
    return (
        <div className={`h-5 w-5 ${props.isLoadingVisible ? '' : 'hidden'}`}>
            <img src={Pokeball} className="h-full aspect-square animate-spin"/>
        </div>
    );
}

export default LoadingPokeball;