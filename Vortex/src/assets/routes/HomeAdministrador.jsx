import { useEffect, useState } from 'react';
import axios from 'axios'; // Importar axios
import Tabla from '../components/TableProducs';
import Buscador from '../components/buscador';
import styles from '../styles/HomeAdministrador.module.css';

const HomeAdministrador = () => {
    const [productos, setProductos] = useState([]);
    const [flag, setFlag] = useState(false);
    const handleListarTodos = () => {               
        axios.get('http://localhost:8080/products/list-products')
            .then(response => {                
                setProductos(response.data);
                console.log(response.data);
            })
            .catch(error => console.error('Error al obtener productos:', error));
    };
    
    useEffect(() => {
        if (flag) {
            handleListarTodos();
            setFlag(false)
        }
    }, [flag]);
    
    

    return (
        <div className={styles.container}>
            <div className={styles.buscadorContainer}>
                <Buscador />
                <Tabla productos={productos} setFlag={setFlag}/> 
            </div>
            <div className={styles.panelTareas}>
                <h2>Panel</h2>
                <button onClick={handleListarTodos}>Listar Todos</button>
                <button>Listar Por Categoria</button>
                <button>Listar por Consola</button>
            </div>
        </div>
    );
};

export default HomeAdministrador;