const FilterBar = () => {
    return (
        <>
            <div className="relative h-7 w-full bg-Primary rounded-t-lg flex justify-center overflow-hidden">
                <div className="absolute bottom-0 h-1 w-full bg-white" />
                <div className="absolute top-3 h-full aspect-square bg-Primary rounded-full border border-4 border-white p-1">
                    <div className="h-full aspect-square bg-white rounded-full" />
                </div>
            </div>
            <div className="bg-LighterBlue mx-2 px-5 py-3">hello</div>
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