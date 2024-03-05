import { computeStyles } from '@popperjs/core'
import React, { useState,useEffect } from 'react'
import axios, { formToJSON } from 'axios'
import Swal from 'sweetalert2'
import { useContextGlobal } from './Util/global.context'

function FoormAddProduct() {

    const [productoNuevo, setProductoNuevo]=useState({
            name:"",
            category:{
                id:""
            },
            description:"",
            price:"",
            type:"",
            console:"",
            images:[
                {imageUrl:""},
                {imageUrl:""},
                 {imageUrl:""},
                 {imageUrl:""},
                 {imageUrl:""}
                ],
            characteristics: [
                         
            ]        
            })

     const[estados,setEstados]=useState({
        validacion:false,
        error:false,
     })
     
        const handleSubmit= async(e)=>{
            e.preventDefault()
            try{
                if(productoNuevo.name===""  || productoNuevo.description==="" 
                || productoNuevo.price==="" ||productoNuevo.type==="" || productoNuevo.console==="" || productoNuevo.images[0].imageUrl==="" 
                || productoNuevo.images[1].imageUrl==="" || productoNuevo.images[2].imageUrl==="" || productoNuevo.images[3].imageUrl==="" || productoNuevo.images[4].imageUrl===""){
                    setEstados((prevState)=>({
                        ...prevState,
                        validacion:false,
                        error:true,
                    }))
                    Swal.fire({
                        title: "Registro fallo",
                        text: "Los campos con * son obligatorios",
                        icon: "error",
                        confirmButtonColor: "#ff00008f",
                        confirmButtonText: "Aceptar",
                        customClass: {
                            popup:'textFalla'
                        }
                      });

                }
                else{
                    console.log(productoNuevo)
                    const response = await axios.post('http://localhost:8080/products/add-product', productoNuevo);
                    console.log(response);
                    setEstados((prevState)=>({
                        ...prevState,
                        validacion:true,
                        error:false,
                    }));
                    setTimeout(()=>{
                        window.location.reload()
                    },2000)
                    Swal.fire({
                        title: "Registrado",
                        text: "El producto se registró correctamente",
                        icon: "success",
                        confirmButtonColor: "#008000a9",
                        customClass: {
                            popup:'textExito'
                        }

                    });
                    setProductoNuevo({
                        name:"",
                        category:{
                            id:""
                        },
                        description:"",
                        price:"",
                        type:"",
                        console:"",
                        images:[
                            {imageUrl:""},
                            {imageUrl:""},
                             {imageUrl:""},
                             {imageUrl:""},
                             {imageUrl:""}
                            ],
                        characteristics: [
                           
                           
                        ]        
                    })
                }
            }
            catch (error) {
                console.error('Error:', error.message);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    customClass: {
                        popup:'textFallaServer'
                    }
                });
                setProductoNuevo({
                    name:"",
                    category:{
                        id:""
                    },
                    description:"",
                    price:"",
                    type:"",
                    console:"",
                    images:[
                        {imageUrl:""},
                        {imageUrl:""},
                         {imageUrl:""},
                         {imageUrl:""},
                         {imageUrl:""}
                        ],
                    characteristics: [
                    
                        
                    ]        
                })
            }  
        }

        const handleOnchangeName=(e)=> {
            setProductoNuevo((prevState) => ({ ...prevState, name: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false})
        }
        const handleOnchangeCategoria=(e)=>{
            setProductoNuevo((prevState) => ({ ...prevState, category:{id: e.target.value.trimStart() }}))
            setEstados({validacion:false, error:false})
        } 
        const handleOnchangeDescripcion=(e)=>{
            setProductoNuevo((prevState) => ({ ...prevState, description: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false})
        } 
        const handleOnchangePrecio=(e)=> {
            setProductoNuevo((prevState) => ({ ...prevState, price: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false})
        }
        const handleOnchangeTipo=(e)=> {
            setProductoNuevo((prevState) => ({ ...prevState, type: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false})
        }
        const handleOnchangeConsola=(e)=> {
            setProductoNuevo((prevState) => ({ ...prevState, console: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false})
        }

        
         const handleImageChange = (index, e) => {
            setEstados({validacion:true, error:false})
             const { name, value } = e.target;
             const imagesCopy = [...productoNuevo.images];
             imagesCopy[index] = { ...imagesCopy[index], [name]: value.trimStart() };
             setProductoNuevo(prevState => ({ ...prevState, images: imagesCopy }));
         };


         const handleCaracteristicaChange = (index, e) => {
            const { value } = e.target;
            const characteristicsCopy = [...productoNuevo.characteristics];
            characteristicsCopy[index] = { id: value.trimStart() };
            setProductoNuevo(prevState => ({ ...prevState, characteristics: characteristicsCopy }));
        };

        
       

  return (
    <div>
    
    <form className="formularioAddProducto">
            <h3 className="tituloFormulario">Agregar Producto</h3>
            <input className="inputName" placeholder="Nombre *" value={productoNuevo.name} onChange={handleOnchangeName}/>
            <input className="inputCategoria" placeholder="Id categoria" value={productoNuevo.category ? productoNuevo.category.id : ''} onChange={handleOnchangeCategoria} />               
            <input className="inputPrecio" placeholder="Precio USD *" value={productoNuevo.price} onChange={handleOnchangePrecio}/>
            <input className="inputTipo" placeholder="Tipo *" value={productoNuevo.type} onChange={handleOnchangeTipo}/>
            <select className="inputConsola" value={productoNuevo.console} onChange={handleOnchangeConsola}>
                <option value="">Consola *</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="PC">PC</option>
            </select>            
            <input className="inputImage1" placeholder="URL Image1 *" name='imageUrl'  value={productoNuevo.images[0].imageUrl} onChange={(e) => handleImageChange(0, e)}/>
            <input className="inputImage2" placeholder="URL Image2 *" name='imageUrl' value={productoNuevo.images[1].imageUrl}onChange={(e) => handleImageChange(1, e)}/>
            <input className="inputImage3" placeholder="URL Image3 *" name='imageUrl'value={productoNuevo.images[2].imageUrl} onChange={(e) => handleImageChange(2, e)}/>
            <input className="inputImage4" placeholder="URL Image4 *" name='imageUrl' value={productoNuevo.images[3].imageUrl}onChange={(e) => handleImageChange(3, e)}/>
            <input className="inputImage5" placeholder="URL Image5 *" name='imageUrl' value={productoNuevo.images[4].imageUrl} onChange={(e) => handleImageChange(4, e)}/> 
            
            <input className="inputCaracteristicaAdd" placeholder="IdCaracterística " value={productoNuevo.characteristics.length > 0 ? productoNuevo.characteristics[0].id : ''} onChange={(e) => handleCaracteristicaChange(0, e)} />            <textarea className="inputDescripcion" placeholder="Descripcion *" value={productoNuevo.description} onChange={handleOnchangeDescripcion}/>
             <button  onClick={handleSubmit}className='guardarProducto'>Grabar</button>
        </form>        
    </div>
  ) 
 
}

export default FoormAddProduct