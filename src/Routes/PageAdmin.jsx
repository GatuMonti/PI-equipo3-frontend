import React, { useState } from 'react'
import FoormAddProduct from '../components/AgregarProducto/FoormAddProduct'
import ListarProductAdmin from '../components/ListarProductAdmin'
import { Link } from 'react-router-dom' //Importamos Link para poder darle navegacion al boton de Categorias
import ListarCaracteristicasAdmin from '../components/ListarCaracteristicasAdmin'
import ListarCategoriasAdmin from '../components/ListarCategoriasAdmin'
import PanelUsuarios from './PanelUsuarios'
import ListarUsuariosAdmin from '../components/ListarUsuariosAdmin'


const PageAdmin = () => {


  const [estadosAdmin, setEstadosAdmin] = useState({
    goAddProduct: false,
    goList: false,
    goCategorias: false,
    goCaracteristicas: false,
    goUsuarios: false
  })

  const handleAddProduct = () => {
    setEstadosAdmin({ goAddProduct: true })
  }

  const handleListProducts = () => {
    setEstadosAdmin({ goList: true })
  }

  const handlePanelCategorias = () => {
    setEstadosAdmin({ goCategorias: true })
  }

  const handlePanelCaracteristicas = () => {
    setEstadosAdmin({ goCaracteristicas: true })
  }

  const handleListaUsuarios = () => {
    setEstadosAdmin({ goUsuarios: true })
  }


  return (

    <div className='pageAdmin'>
      <div className="panel">
        <button onClick={handleAddProduct} className="agregarProducto">Agregar Producto</button>
        <button onClick={handleListProducts} className="ListarProductos">Listar Productos</button>
        <button onClick={handlePanelCategorias} className="ListarCategorias">Listar Categorías</button>
        <button onClick={handlePanelCaracteristicas} className="ListarCategorias">Listar Características</button>
        <button onClick={handleListaUsuarios} className="ListarCategorias">Listar Usuarios</button>

        {/* ***************************Aqui es cuando se usaba link para ir a otra páigna*************************************************** */}
        {/*Cambiamos el nombre del boton de Listar Categorias a Panel de Categorias, tambien agregamos la ruta */}
        {/* <Link to="panelCategorias" className='actualizarProducto' style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}> Panel de Categorias</Link> */}
        {/*Agregamos el boton paraa ir al panel de caracteristicas */}
        {/* <Link to="panelCaracteristicas" className='actualizarProducto' style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}> Panel de Caracteristicas</Link> */}
        {/* <Link to="panelUsuarios" className='actualizarProducto' style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}> Panel de Usuarios</Link> */}
        {/* ************************************************************************************************************** */}
      
      
      </div>
      {
        estadosAdmin.goAddProduct &&
        <FoormAddProduct />
      }
      {
        estadosAdmin.goList &&
        <ListarProductAdmin />
      }
      {
        estadosAdmin.goCategorias &&
        <ListarCategoriasAdmin />
      }

      {
        estadosAdmin.goCaracteristicas &&
        <ListarCaracteristicasAdmin />
      }

      {
        estadosAdmin.goUsuarios &&
        <ListarUsuariosAdmin />
      }
    </div>


  )
}

export default PageAdmin