import Tabla from '../components/TableProducs'
import Buscador from "../components/buscador"
import styles from "../styles/HomeAdministrador.module.css"
const HomeAdministrador = () => {
    
    return(
        <div className={styles.container}>            
            <Buscador />
            <Tabla/>
        </div>
    )
}

export default HomeAdministrador;