const LoadMoreButton = (props) => {
    return (
        <button className={`border-3 border-Secondary p-3 rounded-xl bg-white text-Secondary font-bold cursor-pointer ${props.className}`} onClick={props.onClick}>
            Load More Pokémon
        </button>
    );
}

export default LoadMoreButton;