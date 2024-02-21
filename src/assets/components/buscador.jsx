import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from '../styles/Buscador.module.css'

const Buscador = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para buscar videojuegos utilizando el término de búsqueda (searchTerm)
    console.log('Searching for:', searchTerm);
  };

  return (    
      <form onSubmit={handleSearch} className={styles.container}>
        <input
          type="text"
          className={styles.input}
          placeholder="Buscar videojuegos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className={styles.btnBuscar}>
          <FaSearch />
        </button>
      </form>
    
  );
};

export default Buscador;



    