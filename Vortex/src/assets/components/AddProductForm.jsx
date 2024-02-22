import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from '../styles/AddProductoForm.module.css'

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    precio: '',
    type: '',
    console: '',
    category: '',
    images: ['', '', '', '', '']
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    precio: '',
    images: ['', '', '', '', '']
  });

  const handleImageChange = (index, value) => {
    const updatedImages = [...product.images];
    updatedImages[index] = value;
    setProduct({ ...product, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valido los campos obligatorios.
    const newErrors = {};

    if (!product.name) {
      newErrors.name = 'Por favor ingrese el nombre del producto.';
    }
    if (!product.description) {
      newErrors.description = 'Por favor ingrese la descripción del producto.';
    }
    if (!product.precio) {
      newErrors.precio = 'Por favor ingrese el precio del producto.';
    }
    if (product.images.some(image => !image)) {
      newErrors.images = product.images.map((image, index) => !image ? 'Por favor ingrese la imagen' : '');
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log(product)
      const response = await axios.post('http://localhost:8080/products/add-product', product);
      console.log(response);
      // Restablecer el formulario
      setProduct({
        name: '',
        description: '',
        precio: '',
        type: '',
        console: '',
        category: '',
        images: ['', '', '', '', '']
      });

      setErrors({
        name: '',
        description: '',
        precio: '',
        images: ['', '', '', '', '']
      });


    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className={styles.contenedorPrincipal}>
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
            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
            {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}


          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="precio">Precio:</label>
            <input
              type="number"
              id="precio"
              value={product.precio}
              onChange={(e) => setProduct({ ...product, precio: e.target.value })}
            />
            {errors.precio && <p className={styles.errorMessage}>{errors.precio}</p>}

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
            {errors.images[0] && <p className={styles.errorMessage}>{errors.images[0]}</p>}
            {product.images[0] && <img src={product.images[0]} alt="Main" style={{ maxWidth: '200px' }} />}
          </div>
          <div className={styles.inputContainerImgSecundaria}>
            <label>Imágenes Secundarias:</label>
            {product.images.slice(1).map((image, index) => (
              <div key={index + 1} className={styles.inputContainer}>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index + 1, e.target.value)}
                />
                {errors.images[index + 1] && <p className={styles.errorMessage}>{errors.images[index + 1]}</p>}
              </div>
            ))}
          </div>
          <div className={styles.contenedorBotones}>
          <button className={styles.btnSubmit} type="submit">Agregar Producto</button>
          <Link to="/home_administrador">
            <button className={styles.btnSubmit}>Atras</button>
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;