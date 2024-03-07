<<<<<<< HEAD
import { createContext,useContext,useEffect, useState } from "react";
=======
import { createContext,useContext,useEffect } from "react";
>>>>>>> 0b05361760545396a0674289e0d51b3252a3ee1b
import { useReducer} from "react";
import axios from "axios";
import reducer from '../../reducer/reducer';

export const initialState={
    producto:{},
    productos:[],
<<<<<<< HEAD
    categorias:[], //Se guarda el listado de categorias
    caracteristicas:[],
=======
>>>>>>> 0b05361760545396a0674289e0d51b3252a3ee1b
    theme:"light"
}

export const contextoGlobal=createContext();

const ContextProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,initialState)
<<<<<<< HEAD
    const [updatingCategories, setUpdatingCategories] = useState(false);//Gatu: Estados para poder actualizar el arreglo cada ves que se modifique y hacer que se renderice
    const [updatingCaracteristics, setUpdatingCaracteristics] = useState(false);


    const endPointProducts="http://localhost:8080/products/list-products";
    const endPointCategias="http://localhost:8080/categorias/listar-categorias";
    const endPointCaracteristicas = "http://localhost:8080/characteristics/list-characteristics";
=======

    const endPointProducts="http://localhost:8080/products/list-products";
>>>>>>> 0b05361760545396a0674289e0d51b3252a3ee1b

    useEffect(()=>{
        axios(endPointProducts)
        .then(res=> dispatch({type: 'get_productos', payload:res.data},console.log(res.data)))
    },[])

<<<<<<< HEAD
  //Gatu: Logica que actualiza automaticamente el arreglo de categorias y lo renderiza cuando hay algun cambio en el mismo
  useEffect(() => {
    if (!updatingCategories) {
        axios(endPointCategias)
            .then(res => dispatch({type: 'get_categorias', payload: res.data}))
            .catch(error => console.error('Error obteniendo categorías:', error));
    } else {
        setUpdatingCategories(false);
    }
}, [updatingCategories]);

const updateCategories = () => {
    setUpdatingCategories(true);
};


//Gatu: Logica que actualiza automaticamente el arreglo de caracteristicas y lo renderiza cuando hay algun cambio
useEffect(() => {      
    console.log("g")  
    if (!updatingCaracteristics) {
        axios(endPointCaracteristicas)
            .then(res => dispatch({type: 'get_caracteristicas', payload: res.data}))
            .catch(error => console.error('Error obteniendo categorías:', error));
    } else {
        setUpdatingCaracteristics(false);
    }
}, [updatingCaracteristics]);

const updateCaracteristics = () => {
    setUpdatingCaracteristics(true);
};
//-------------------------------------------------------------------------------------------------------------------------
=======

>>>>>>> 0b05361760545396a0674289e0d51b3252a3ee1b
    return(
        <contextoGlobal.Provider value={{
            state,dispatch
          }}>
            {children}
          </contextoGlobal.Provider>
    )
}

export default ContextProvider

<<<<<<< HEAD
export const useContextGlobal=()=> useContext(contextoGlobal)

=======
export const useContextGlobal=()=> useContext(contextoGlobal)
>>>>>>> 0b05361760545396a0674289e0d51b3252a3ee1b
