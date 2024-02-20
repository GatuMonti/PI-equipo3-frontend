import axios from "axios";

const CategoriasJuegos = ({ categoria, setProductos, setVisible }) => {
  let arreglo = [];

  if (categoria === "categoria") {
    arreglo = [
      "Accion",
      "Aventura",
      "Simulacion",
      "Deportes",
      "Estrategia",
      "Terror",
      "Suspenso",
      "Retro",
      "En Linea",
    ];
  } else {
    arreglo = [
      "Nintendo switch",
      "Nintendo U",
      "PlayStation 4",
      "PlayStation 5",
      "X-Box One",
      "X-Box 360",
    ];
  }

  const handleCategoria = (elemento) => {
    console.log(elemento);
    axios
      .get("http://localhost:8080/products/search-category/" + elemento)
      .then((response) => {
        setProductos(() => response.data);
        setVisible((prevState) => ({ ...prevState, tabla: true }));
      })
      .catch((error) => console.log(error));
  };

  return arreglo.map((elemento, index) => (
    <button onClick={() => handleCategoria(elemento)} key={index}>
      {elemento}
    </button>
  ));
};

export default CategoriasJuegos;
