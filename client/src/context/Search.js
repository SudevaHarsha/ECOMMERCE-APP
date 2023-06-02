import { useState, useEffect, useContext, createContext } from "react";


const SearchContext = createContext();

const SeachProvider = ({children})=>{
    const [auth, setAuth] = useState({
        keyword : "",
        results: [],
      });

    return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>

    )
};

const useSearch = ()=> useContext(SearchContext);

export {useSearch, SeachProvider};