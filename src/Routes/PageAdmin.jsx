import React, { useState } from 'react'
import FoormAddProduct from '../components/AgregarProducto/FoormAddProduct'
import ListarProductAdmin from '../components/ListarProductAdmin'
import { Link } from 'react-router-dom' //Importamos Link para poder darle navegacion al boton de Categorias


const PageAdmin = () => {


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
             {/*Cambiamos el nombre del boton de Listar Categorias a Panel de Categorias, tambien agregamos la ruta */}
             <Link to="panelCategorias" className='actualizarProducto' style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}> Panel de Categorias</Link>
              {/*Agregamos el boton paraa ir al panel de caracteristicas */}
             <Link to="panelCaracteristicas" className='actualizarProducto' style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}> Panel de Caracteristicas</Link>
             <Link to="panelUsuarios" className='actualizarProducto' style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}> Panel de Usuarios</Link>
            </div>
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