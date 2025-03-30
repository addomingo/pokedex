import { Search } from 'lucide-react';
import PokeballIcon from '../assets/Pokeball_Icon.png';
import { useState } from 'react';

const FilterBar = () => {
    const [isAdvancedOptionsVisible, setIsAdvancedOptionsVisible] = useState(false);

    return (
        <>
            {/* top border */}
            <div className="relative h-7 w-full bg-Primary rounded-t-lg flex justify-center overflow-hidden">
                <div className="absolute bottom-0 h-1 w-full bg-white" />
                <div className="absolute top-3 h-full aspect-square bg-Primary rounded-full border border-4 border-white p-1">
                    <div className="h-full aspect-square bg-white rounded-full" />
                </div>
            </div>

            {/* content */}
            <div className="flex flex-col xl:flex-row gap-5 bg-LighterBlue mx-2 px-5 py-3">
                {/* search bar */}
                <div className="grow flex bg-white text-Secondary font-bold py-2 px-5 rounded-lg flex gap-5 h-10">
                    <h3 className="flex-none">Find that Pokemon!</h3>
                    <input 
                        className="focus:outline-none grow"
                        placeholder="Enter name or ID no."
                        type="text"
                        //value={}
                        id="search"
                    />
                    <Search />
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                    {/* sort selector */}
                    <div className="flex-1 xl:flex-none bg-white text-Secondary font-bold py-2 px-5 rounded-lg flex items-center gap-5 h-10">
                        <img src={PokeballIcon} className="h-5"></img>
                        <h3 className="flex-none">Sort by</h3>
                        <select name="sort" id="sort" className="w-30 focus:outline-none grow">
                            <option value="asc_id">ID no.</option>
                            <option value="desc_id">Name</option>
                        </select>
                    </div>

                    {/* sort selector */}
                    <div className="flex-1 xl:flex-none bg-white text-Secondary font-bold py-2 px-5 rounded-lg flex items-center gap-5 h-10">
                        <img src={PokeballIcon} className="h-5"></img>
                        <h3 className="flex-none">Order by</h3>
                        <select name="order" id="order" className="w-35 focus:outline-none grow">
                            <option value="asc_id">Ascending</option>
                            <option value="desc_id">Descending</option>
                        </select>
                    </div>
                    
                    {/* button to show advanced search options */}
                    {/* <button className="bg-white text-Secondary font-bold py-2 px-5 rounded-lg flex gap-2 justify-center items-center cursor-pointer">
                        <img src={PokeballIcon} className="h-5"></img>
                        Show Advanced Search
                        <img src={PokeballIcon} className="h-5"></img>
                    </button> */}
                </div>
            </div>

            {/* bottom border */}
            <div className="relative h-7 w-full bg-Primary rounded-b-lg flex justify-center overflow-hidden">
                <div className="absolute top-0 h-1 w-full bg-white" />
                    <div className="absolute bottom-3 h-full aspect-square bg-Primary rounded-full border border-4 border-white p-1">
                        <div className="h-full aspect-square bg-white rounded-full" />
                    </div>
            </div>
        </>
    );
}

export default FilterBar;