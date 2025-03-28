import PokeballIcon from '../assets/Pokeball_Icon.png';

const InfoModal = (props) => {
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
    const type = 'water';
    const id = 2;
    const imageID = id.toString().padStart(3, '0');
    const displayID = id.toString().padStart(4, '0');
    const name = 'Lapras';
    const category = 'Transport Pokemon';

    const shadowStyle = 'shadow-[15px_15px_4px_#bfbfbf]';

    return (
        <dialog id={props.id} className="modal">
            <div className="modal-box h-[calc(100%-25vh)] w-full max-w-[75vw] flex p-0">
                {/* pokemon image */}
                <div className="h-[75%] flex-1 bg-blue-100"></div>
                
                {/* pokemon information */}
                <div className="flex-1 my-5 ml-5 mr-8">
                    
                    <div className={`flex-1 flex-col border border-3 rounded-xl border-GrayBorder overflow-hidden ${shadowStyle}`}>
                        {/* pokemon ID number and name */}
                        <div className="flex gap-2 px-4 py-2" style={{ backgroundColor: typeColor.get(type) }}>
                        <img src={PokeballIcon} className="h-8 flex-none aspect-square rounded-full m-[3px] border border-white border-3"/>
                            <h1 className="flex-none text-3xl font-bold text-white">{displayID}</h1>
                            <h1 className="flex-grow text-3xl font-bold text-white pl-10">{name}</h1>
                        </div>
                        {/* pokemon category */}
                        <div className="bg-white flex justify-end px-4 py-2">
                            <h2 className="text-2xl font-semibold text-BlackText">{category}</h2>
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