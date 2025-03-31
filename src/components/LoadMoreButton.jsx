const LoadMoreButton = (props) => {
    return (
        <button className={`border-3 p-3 rounded-xl bg-white cursor-pointer ${props.className}`} onClick={props.onClick}>
            Load More Pokemon
        </button>
    );
}

export default LoadMoreButton;