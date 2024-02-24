import { computeStyles } from '@popperjs/core'
import React, { useState,useEffect } from 'react'
import axios, { formToJSON } from 'axios'
import ListarProductAdmin from './ListarProductAdmin'

function FoormAddProduct() {


    const [productoNuevo, setProductoNuevo]=useState({
            name:"",
            category:"",
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
            ] 
        })

     const[estados,setEstados]=useState({
        validacion:false,
        error:false,
        message:"",
     })
     
        const handleSubmit= async(e)=>{
            e.preventDefault()
            try{
                if(productoNuevo.name==="" || productoNuevo.category==="" || productoNuevo.description==="" 
                || productoNuevo.price==="" ||productoNuevo.type==="" || productoNuevo.console==="" || productoNuevo.images[0].imageUrl==="" 
                || productoNuevo.images[1].imageUrl==="" || productoNuevo.images[2].imageUrl==="" || productoNuevo.images[3].imageUrl==="" || productoNuevo.images[4].imageUrl===""){
                    setEstados((prevState)=>({
                        ...prevState,
                        validacion:false,
                        error:true,
                        message:"No pueden haber campos vacios",
                    }))
                }
                else{
                    console.log(productoNuevo)
                    const response = await axios.post('http://localhost:8080/products/add-product', productoNuevo);
                    console.log(response);
                    setEstados((prevState)=>({
                        ...prevState,
                        validacion:true,
                        error:false,
                        message:"Registro correcto",
                    }));
                    setProductoNuevo({
                        name:"",
                        category:"",
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
                        ] 
                    })
                }
            }
            catch (error) {
                console.error('Error:', error.message);
            }  
        }

        const handleOnchangeName=(e)=> {
            setProductoNuevo((prevState) => ({ ...prevState, name: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false,message:""})
        }
        const handleOnchangeCategoria=(e)=>{
            setProductoNuevo((prevState) => ({ ...prevState, category: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false,message:""})
        } 
        const handleOnchangeDescripcion=(e)=>{
            setProductoNuevo((prevState) => ({ ...prevState, description: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false,message:""})
        } 
        const handleOnchangePrecio=(e)=> {
            setProductoNuevo((prevState) => ({ ...prevState, price: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false,message:""})
        }
        const handleOnchangeTipo=(e)=> {
            setProductoNuevo((prevState) => ({ ...prevState, type: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false,message:""})
        }
        const handleOnchangeConsola=(e)=> {
            setProductoNuevo((prevState) => ({ ...prevState, console: e.target.value.trimStart() }))
            setEstados({validacion:false, error:false,message:""})
        }

        
         const handleImageChange = (index, e) => {
            setEstados({validacion:true, error:false,message:""})
             const { name, value } = e.target;
             const imagesCopy = [...productoNuevo.images];
             imagesCopy[index] = { ...imagesCopy[index], [name]: value.trimStart() };
             setProductoNuevo(prevState => ({ ...prevState, images: imagesCopy }));
         };

       

  return (
    <div>
    
        <form className="formularioAddProducto">
            <h3 className="tituloFormulario">Agregar Producto</h3>
            <input className="inputName" placeholder="Nombre" value={productoNuevo.name} onChange={handleOnchangeName}/>
            <select className="inputCategoria" value={productoNuevo.category} onChange={handleOnchangeCategoria}>
                <option value="">Categoria</option>
                <option value="Deportes">Deportes</option>
                <option value="Aventura">Aventura</option>
                <option value="Accion">Accion</option>
                <option value="Terror">Terror</option>
                <option value="Infantil">Infantil</option>
                <option value="Pelea">Pelea</option>
            </select>  
            <input className="inputPrecio" placeholder="Precio USD" value={productoNuevo.price} onChange={handleOnchangePrecio}/>
            <input className="inputTipo" placeholder="Tipo" value={productoNuevo.type} onChange={handleOnchangeTipo}/>
            <select className="inputConsola" value={productoNuevo.console} onChange={handleOnchangeConsola}>
                <option value="">Consola</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="PC">PC</option>
            </select>            
            <input className="inputImage1" placeholder="URL Image1" name='imageUrl'  value={productoNuevo.images[0].imageUrl} onChange={(e) => handleImageChange(0, e)}/>
            <input className="inputImage2" placeholder="URL Image2" name='imageUrl' value={productoNuevo.images[1].imageUrl}onChange={(e) => handleImageChange(1, e)}/>
            <input className="inputImage3" placeholder="URL Image3" name='imageUrl'value={productoNuevo.images[2].imageUrl} onChange={(e) => handleImageChange(2, e)}/>
            <input className="inputImage4" placeholder="URL Image4" name='imageUrl' value={productoNuevo.images[3].imageUrl}onChange={(e) => handleImageChange(3, e)}/>
            <input className="inputImage5" placeholder="URL Image5" name='imageUrl' value={productoNuevo.images[4].imageUrl} onChange={(e) => handleImageChange(4, e)}/> 
            <textarea className="inputDescripcion" placeholder="Descripcion" value={productoNuevo.description} onChange={handleOnchangeDescripcion}/>

             <button  onClick={handleSubmit}className='guardarProducto'>Grabar</button>
        </form> 
    
      
        {estados.validacion ?<h3 className='mensajeExitoso'>{estados.message}</h3> :<h3 className='mensajeError'>{estados.message}</h3> }
       
    </div>
  ) 
 
}

export default FoormAddProduct