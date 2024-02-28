import { createContext,useContext,useEffect } from "react";
import { useReducer} from "react";
import axios from "axios";
import reducer from '../../reducer/reducer';

export const initialState={
    producto:{},
    productos:[],
    theme:"light"
}

export const contextoGlobal=createContext();

const ContextProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,initialState)

    const endPointProducts="http://localhost:8080/products/list-products";

    useEffect(()=>{
        axios(endPointProducts)
        .then(res=> dispatch({type: 'get_productos', payload:res.data},console.log(res.data)))
    },[])


    return(
        <contextoGlobal.Provider value={{
            state,dispatch
          }}>
            {children}
          </contextoGlobal.Provider>
    )
}

export default ContextProvider

export const useContextGlobal=()=> useContext(contextoGlobal)