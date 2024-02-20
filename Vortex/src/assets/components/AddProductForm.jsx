import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from '../styles/AddProductoForm.module.css'

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    type: '',
    console: '',
    category: '',
    images: ['', '', '', '', '']
  });

  const handleImageChange = (index, value) => {
    const updatedImages = [...product.images];
    updatedImages[index] = value;
    setProduct({ ...product, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(product)
      const response = await axios.post('http://localhost:8080/products/add-product', product);
      console.log(response);
      // Restablecer el formulario
      setProduct({
        name: '',
        description: '',
        price: '',
        type: '',
        console: '',
        category: '',
        images: ['', '', '', '', '']
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className={styles.contenedorPrincipal}>
      <Link to="/home_administrador">        <button>Atras</button>      </Link> 
    
    <div className={styles.container}>
      <h2>Agregar Producto</h2>
      <form className={styles.fromContainer} onSubmit={handleSubmit}>      
        <div className={styles.inputContainer}>
        <label htmlFor="productName">Nombre:</label>
        <input
          type="text"
          id="productName"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        </div>
        <div className={styles.inputContainer}>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        </div>
        <div className={styles.inputContainer}>
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        </div>
        <div className={styles.inputContainer}>
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          value={product.type}
          onChange={(e) => setProduct({ ...product, type: e.target.value })}
        >
          <option value="">Selecciona un tipo</option>
          <option value="Consola">Consola</option>
          <option value="Juego">Juego</option>
        </select>
        </div>
        {product.type === 'Juego' && (
          <>
            <div className={styles.inputContainer}>
            <label htmlFor="console">Consola:</label>
            <select
              id="console"
              value={product.console}
              onChange={(e) => setProduct({ ...product, console: e.target.value })}
            >
              <option value="">Selecciona una consola</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Nintendo U">Nintendo U</option>
              <option value="Play Station 4">Play Station 4</option>
              <option value="Play Station 5">Play Station 5</option>
              <option value="X-Box One">X-Box One</option>
              <option value="X-Box 360">X-Box 360</option>
            </select>
            </div>
            <div className={styles.inputContainer}>
            <label htmlFor="category">Categoría:</label>
            <select
              id="category"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Accion">Acción</option>
              <option value="Aventura">Aventura</option>
              <option value="Simulacion">Simulación</option>
              <option value="Deportes">Deportes</option>
              <option value="Estrategia">Estrategia</option>
              <option value="Terror">Terror</option>
              <option value="Suspenso">Suspenso</option>
              <option value="Retro">Retro</option>
              <option value="En Linea">En Línea</option>
            </select>
            </div>
          </>
        )}
        {product.type === 'Consola' && (
          
            <div className={styles.inputContainer}>
            <label htmlFor="console">Consola:</label>
            <select
              id="console"
              value={product.console}
              onChange={(e) => setProduct({ ...product, console: e.target.value })}
            >
              <option value="">Selecciona una consola</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Nintendo U">Nintendo U</option>
              <option value="Play Station 4">Play Station 4</option>
              <option value="Play Station 5">Play Station 5</option>
              <option value="X-Box One">X-Box One</option>
              <option value="X-Box 360">X-Box 360</option>
            </select>
            </div>
          
        )}
        <div className={styles.inputContainer}>
         <label htmlFor="mainImage">Imagen Principal:</label>
        <input
          type="text"
          id="mainImage"
          value={product.images[0]} 
          onChange={(e) => setProduct({ ...product, images: [e.target.value, ...product.images.slice(1)] })} 
        />
        {product.images[0] && <img src={product.images[0]} alt="Main" style={{ maxWidth: '200px' }} />} 
        </div>
        <div className={styles.inputContainerImgSecundaria}>
        <label>Imágenes Secundarias:</label>
        {product.images.slice(1).map((image, index) => (
          <input
            key={index + 1}
            type="text"
            value={image}
            onChange={(e) => handleImageChange(index + 1, e.target.value)}
          />
        ))}
        </div>
        <button className={styles.btnSubmit} type="submit">Agregar Producto</button> 
              
      </form>
    </div>
    </div>
  );
};

export default AddProductForm;