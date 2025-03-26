const PokedexCircle = (props) => {
    return (
        <div className={`absolute ${props.position} h-[50vh] w-[50vh] rounded-full bg-[#760f1b] p-[10px]`}>
            <div className="h-full w-full rounded-full bg-Red p-[75px]">
                <div className="h-full w-full rounded-full bg-[#760f1b] p-[10px]">
                    <div className="h-full w-full rounded-full bg-Red">
                    </div>
                </div>
            </div>
        </div>
    );
}

const Pokedex = () => {
    return (
        <div className="h-screen w-screen">
            <div className="relative h-1/2 bg-Red flex justify-center overflow-hidden">
                {/* lines (top part) */}
                <div className="absolute bottom-0 h-[23px] w-full bg-[#760f1b]" />
                <div className="absolute bottom-0 h-[13px] w-full bg-white z-10 border-b-1 border-black" />
                {/* main circle (top half) */}
                <div className="absolute top-50 h-[50vh] w-[50vh] rounded-full bg-[#760f1b]" />
                <div className="absolute top-50 h-[50vh] w-[50vh] rounded-full p-[10px] z-10">
                    <div className="h-full w-full rounded-full bg-white p-[13px]">
                        <div className="h-full w-full rounded-full bg-black p-[75px]">
                            <div className="h-full w-full rounded-full bg-LightBlue">
                            </div>
                        </div>
                    </div>
                </div>
                <PokedexCircle position="-top-50 -left-50"></PokedexCircle>
                <PokedexCircle position="-top-50 -right-50"></PokedexCircle>
            </div>

            <div className="relative h-1/2 bg-Red flex justify-center overflow-hidden">
                {/* lines (bottom part) */}
                <div className="absolute top-0 h-[23px] w-full bg-[#760f1b]" />
                <div className="absolute top-0 h-[13px] w-full bg-white z-10 border-t-1 border-black" />
                {/* main circle (bottom half) */}
                <div className="absolute bottom-50 h-[50vh] w-[50vh] rounded-full bg-[#760f1b]" />
                <div className="absolute bottom-50 h-[50vh] w-[50vh] rounded-full p-[10px] z-10">
                    <div className="h-full w-full rounded-full bg-white p-[13px]">
                        <div className="h-full w-full rounded-full bg-black p-[75px]">
                            <div className="h-full w-full rounded-full bg-LightBlue">
                            </div>
                        </div>
                    </div>
                </div>
                <PokedexCircle position="-bottom-50 -left-50"></PokedexCircle>
                <PokedexCircle position="-bottom-50 -right-50"></PokedexCircle>
            </div>

        </div>
    );
}

export default Pokedex;