import React from 'react';
import CardTabla from './CardTabla';
import styles from '../styles/TablaProductos.module.css'

const TableProducts = ({productos, setFlag}) => {
  // Array con 10 elementos para generar las tarjetas
  const products = productos;

  return (
    <div className={styles.container}>
      {products.map((product, index) => (
        <CardTabla key={index} name={product.name} consola={product.console} id={product.id} setFlag={setFlag}/>
      ))}
    </div>
  );
};

export default TableProducts;
