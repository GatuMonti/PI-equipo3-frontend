import React from 'react';
import CardTabla from './CardTabla';
import styles from '../styles/TablaProductos.module.css'

const TableProducts = () => {
  // Array con 10 elementos para generar las tarjetas
  const products = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div className={styles.container}>
      {products.map((product, index) => (
        <CardTabla key={index} name={`Zelda`} consola={`Nintendo DS`} />
      ))}
    </div>
  );
};

export default TableProducts;
