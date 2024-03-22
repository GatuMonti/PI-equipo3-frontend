import React from 'react'
import ListarCaracteristicasAdmin from '../components/ListarCaracteristicasAdmin'
import AgregarCaracteristicaButton from '../components/AgregarCaracteristicasButtons'
import { Link } from 'react-router-dom'


const PanelCaracteristicas = () => {
  return (
    <main className='panelCaracteristicas'>
      
          <Link to={'/pageAdmin'}><button className='botonRegresarPageAdmin'>Atras</button></Link>

           <div className="panel">

           <AgregarCaracteristicaButton/>
            </div>
            <ListarCaracteristicasAdmin/>            
        </main>
  )
}

export default PanelCaracteristicas