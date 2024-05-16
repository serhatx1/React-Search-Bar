import React, { useState } from 'react';
import data from "../Json/.json"
export const SearchBar = () => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchedBefore,setSearchedBefore] = useState({})
    const [showData,setShowData] = useState([])

    const handleChanges = (e) => {
        setValue(e.target.value);
        handleSearch(e.target.value)
    };
    const handleSearch = (targetValue)=>{
        if(targetValue.replace(/\s/g, '').length<1){
            return 0
        }
        const loopData = (datas)=>{
            
            let forSearchedBefore = []
            for(let i in datas){
                const val = datas[i].phrases.filter((thread)=>(thread.replace(/\W/g, '').toLowerCase()).startsWith(targetValue.replace(/\W/g, '').toLowerCase()))
                if (val !== undefined && val !== null) {
                    forSearchedBefore = forSearchedBefore.concat(val);
                }
                
            }
           if(forSearchedBefore.length<10){
            for (let i in datas) {
                const val = datas[i].phrases.filter(thread => {
                 
                    return thread.toLowerCase().replace(/\W/g, '').includes(targetValue.replace(/\W/g, '').toLowerCase());
                });
                
                val.forEach((thread) => {
                    let exists = forSearchedBefore.some((searched) => thread === searched);
                    if (!exists) {
                        forSearchedBefore.push(thread);
                    }
                }); 
            }
            
           }
           forSearchedBefore=forSearchedBefore.slice(0,10)
           setShowData(forSearchedBefore)
           searchedBefore[targetValue]=forSearchedBefore
           return forSearchedBefore
        }
        if(typeof searchedBefore[targetValue.toLowerCase()]!="undefined"){
            setShowData(searchedBefore[targetValue.toLowerCase()])
        }
        else{
            const datas =Object.values(data)
            setShowData([])
            loopData(datas)            
        }
    }
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
      <div className={`w-1/3 bg-white rounded fixed p-2 top-20  h-contain border-2 ${
          isFocused ? "border-slate-900" : "border-slate-100"
        }`}
      >
        <div className="h-12 w-full sticky rounded relative flex bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            className="flex justify-center items-center h-full border-gray-300 "
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
          </svg>
          <input
            type="text"
            name="search"
            className="pl-2 border-0 outline-none text-l w-full h-full"
            value={value}
            onChange={(e) => handleChanges(e)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search"
          />
        </div>
        <div>
        {value.length > 0 && (
          <div className="text-black w-full">
            <p className="max-w-full break-all cursor-pointer p-4 border-b-1 border-gray-200">{`Search for ${value}`}</p>
            {
                showData.map((thread)=>(
                    <div className='hover:bg-slate-300 p-2 pl-4 cursor-pointer'>
                        {thread}
                        
                    </div>
                ))
            }
            {
                showData.length<1&&
                <div className='hover:bg-slate-300 pl-4 cursor-pointer'>
                No Result
                
            </div>
            }

          </div>
        )}
        </div>
      </div>
    );
};
