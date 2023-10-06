const RenderButtons = (props)=>{
    const {totalUsers,setCurrentPage,currentPage}=props;
    const buttons=[];
    for(let i=0;i<Math.ceil(totalUsers/10);i++){
        buttons.push(
            <button className={`font-sans w-8 h-8 mx-2 hover:bg-gray-400 hover:text-white text-xs font-bold pb-1 px-1 rounded-full ${i===currentPage?'bg-gray-500 text-white':'bg-gray-300 text-gray-800'}`} onClick={()=>{setCurrentPage(i)}} key={i}>{i+1}</button>
        )
    }
    return buttons;
}

export default RenderButtons;