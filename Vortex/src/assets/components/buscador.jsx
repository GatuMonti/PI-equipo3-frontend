import React, { useState } from 'react';

function buscador({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value); 
      };


      return (
        <section className="buscador">
          <input
            type="text"
            placeholder="Buscador..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
         
        </section>
      );
    }      

    export default buscador;
    