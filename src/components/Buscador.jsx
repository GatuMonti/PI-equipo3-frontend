import React, { useState } from 'react';

function buscador({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value); 
      };


      return (
        <div className='buscadorContainer'>
          <section className="buscador">
            <input
             type="text"
             placeholder="Buscador..."
             value={searchTerm}
             onChange={handleSearchChange}
            />
         
          </section>
        </div>
      );
    }      

    export default buscador;
    