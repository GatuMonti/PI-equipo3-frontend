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
      "Nintendo Switch",
      "Nintendo U",
      "Play Station 4",
      "Play Station 5",
      "X-Box One",
      "X-Box 360",
    ];
  }

  const handleCategoria = (elemento) => {
    console.log(elemento);
    if(categoria==="categoria"){
      axios
      .get("http://localhost:8080/products/search-category/" + elemento)
      .then((response) => {
        setProductos(() => response.data);       
      })
      .catch((error) => console.log(error));
    }if (categoria==="consolas") {
      axios
      .get("http://localhost:8080/products/search-consola/" + elemento)
      .then((response) => {
        setProductos(() => response.data); 
        console.log(response.data);       
      })
      .catch((error) => console.log(error));
    } 

    setVisible((prevState) => ({ ...prevState, tabla: true }))
    
  };

  return arreglo.map((elemento, index) => (
    <button onClick={() => handleCategoria(elemento)} key={index}>
      {elemento}
    </button>
  ));
};

export default CategoriasJuegos;
