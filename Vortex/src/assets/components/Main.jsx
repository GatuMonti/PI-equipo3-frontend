import Card from "./Card"
import styles from "../styles/Main.module.css"
import Slider from "./Slider"
import { useContextGlobal } from '../components/util/global.context'
const Main = () =>{    
        
    
    const{state}=useContextGlobal()
    return (
        <main className={styles.container}>
            <Slider />

        {/*Renderizacion de productos*/ }

        <div className={styles.contenedorProductos}>
          <h1 className={styles.tituloProductos}>Los Mas Recomendados</h1>
          {state.productos.slice(-10).reverse().map((producto)=><Card product={producto} key={producto.id}/>)}
        </div>
        </main>
    )
}

export default Main;