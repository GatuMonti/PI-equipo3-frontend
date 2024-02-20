import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Tabla from "../components/TableProducs";
import Buscador from "../components/buscador";
import styles from "../styles/HomeAdministrador.module.css";
import CategoriasJuegos from "../components/CategoriasJuegos";

const HomeAdministrador = () => {
  const [productos, setProductos] = useState([]);
  const [visible, setVisible] = useState({
    tabla: false,
    buscador: true,
    categorias: false,
    consolas: false,
  });

  const handleListarTodos = () => {
    cargarProductos();
    setVisible({
      tabla: true,
      buscador: true,
      categorias: false,
      consolas: false,
    });
  };
  const cargarProductos = () => {
    axios
      .get("http://localhost:8080/products/list-products")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => console.error("Error al obtener productos:", error));
  };

  useEffect(() => {
    
  }, [productos]);

  return (
    <div className={styles.container}>
      <div className={styles.panelTareas}>
        <div className={styles.btnListados}>
          <button onClick={handleListarTodos}>Listar Todos</button>
          <button
            onClick={() =>
              setVisible({
                tabla: false,
                buscador: false,
                categorias: true,
                consolas: false,
              })
            }
          >
            Listar Por Categoria
          </button>
          <button
            onClick={() =>
              setVisible({
                tabla: false,
                buscador: false,
                categorias: true,
                consolas: true,
              })
            }
          >
            Listar por Consola
          </button>
        </div>
        <Link to="/">
          <button className={styles.btnHome}>Home</button>
        </Link>
      </div>
      <div className={styles.navCategorias}>
        {visible.categorias && (
          <CategoriasJuegos
            categoria={visible.consolas ? "consolas" : "categoria"}
            setProductos={setProductos}
            setVisible={setVisible}
          />
        )}
      </div>
      <div className={styles.buscadorContainer}>
        {visible.buscador && <Buscador />}
        {visible.tabla && (
          <Tabla productos={productos} cargarProductos={cargarProductos} />
        )}
      </div>
    </div>
  );
};

export default HomeAdministrador;
