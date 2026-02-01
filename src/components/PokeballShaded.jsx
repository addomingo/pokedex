const PokeballShaded = (props) => {
    const pokeballColor = props.color;
    const classNameValues = props.className;
    const style = props.style;

    return (
        <svg 
            fill={pokeballColor}
            // width="24" 
            // height="24" 
            className={`h-full aspect-square ${classNameValues}`}
            style={style}
            viewBox="0 0 24 24" 
            data-name="Layer 1" 
            id="Layer_1" 
            xmlns="http://www.w3.org/2000/svg">
                <path d="M21.9012 13H16.8506C16.3873 15.2822 14.3696 17 11.9506 17C9.53167 17 7.51391 15.2822 7.05064 13H2C2.50172 18.0533 6.76528 22 11.9506 22C17.136 22 21.3995 18.0533 21.9012 13Z"></path>
                <path d="M21.9012 11C21.3995 5.94668 17.136 2 11.9506 2C6.76528 2 2.50172 5.94668 2 11H7.05064C7.51391 8.71776 9.53167 7 11.9506 7C14.3696 7 16.3873 8.71776 16.8506 11H21.9012Z"></path>
                <circle cx="11.9506" cy="12" r="3"/>
        </svg>
    );
}

export default PokeballShaded;