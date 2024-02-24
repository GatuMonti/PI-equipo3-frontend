import React, { useState } from 'react'
import FoormAddProduct from '../components/FoormAddProduct'
import ListarProductAdmin from '../components/ListarProductAdmin'

const PageAdmin = () => {
    console.log(localStorage.getItem("role"))

    const [estadosAdmin, setEstadosAdmin]=useState({
      goAddProduct:false,
      goList:false
    })

    const handleAddProduct=()=>{
        setEstadosAdmin({goAddProduct:true})
    }
    
    const handleListProducts=()=>{
      setEstadosAdmin({goList:true})
    }


  return (
   
        <main className='pageAdmin'>
           <div className="panel">
             <button onClick={handleAddProduct} className="agregarProducto">Agregar Producto</button>
             <button onClick={handleListProducts}className="ListarProductos">Listar Productos</button>
             <button className="ListarCategorias">Listar Categorias</button>
             <button className="actualizarProducto">Actualizar producto</button>
            </div>
            <div className='vacio'></div>
            {estadosAdmin.goAddProduct &&
                <FoormAddProduct/>
            }
            {estadosAdmin.goList && 
            <ListarProductAdmin/>
            }
            
        </main>
       

  )
}

export default PageAdmin