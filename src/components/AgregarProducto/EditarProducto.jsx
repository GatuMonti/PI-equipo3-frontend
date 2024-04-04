import React, { useEffect, useState, Button } from 'react'
import { useParams } from 'react-router-dom'
import { useContextGlobal } from '../Util/global.context'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import styles from './addProduct.module.css';
import { response } from 'msw';
import { urlBackend } from '../../App'

const EditarProducto = ({ productId, toggleFormEditar }) => {

  const params = useParams()

  const { state, dispatch } = useContextGlobal()

  const navigate = useNavigate();

  const endPointDetail = `${urlBackend}products/search-id/${productId}`

  // console.log(params.id)
  // console.log("Product Id desde el EditProducto" + productId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(endPointDetail);
        dispatch({ type: 'get_producto', payload: response.data });
        console.log(response.data);
        setProductoActualizar((prevState) => ({
          ...prevState,
          id: response.data.id,
          name: response.data.name,
          category: response.data.category, ///Agrego para pre-cargar en el form
          description: response.data.description,
          price: response.data.price,
          console: response.data.console,
          images: response.data.images,
          type: response.data.type,
          characteristics: response.data.characteristics///Agrego para pre-cargar en el form
        }))

      } catch (error) {
        console.error("Error fetching product details:", error);
      }
      console.log("consola que esta en el producto" + productoActualizar.console);
      // console.log("aca esta el producto a actualizar--->" + productoActualizar);
      console.log("Categoriaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:" + productoActualizar.category.title)
    };

    fetchData();
  }, [endPointDetail, dispatch]);



  /******Logica formulario****/


  const [productoActualizar, setProductoActualizar] = useState({
    id: "",
    name: "",
    category: {
      id: ""
    },
    description: "",
    price: "",
    type: "",
    console: "",
    images: [
      { imageUrl: "" },
      { imageUrl: "" },
      { imageUrl: "" },
      { imageUrl: "" },
      { imageUrl: "" }
    ],
    characteristics: []
  });




  const [estados, setEstados] = useState({
    validacion: false,
    error: false,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (productoActualizar.name === "" || productoActualizar.description === "" /*Pendiente agregar validaciones del id y product de las imagenes*/
        || productoActualizar.price === "" || productoActualizar.type === "" || productoActualizar.console === "" || productoActualizar.images[0].imageUrl === ""
        || productoActualizar.images[1].imageUrl === "" || productoActualizar.images[2].imageUrl === "" || productoActualizar.images[3].imageUrl === "" || productoActualizar.images[4].imageUrl === "") {
        setEstados((prevState) => ({
          ...prevState,
          validacion: false,
          error: true,
        }))

        Swal.fire({
          title: "Actualizacion fallo",
          text: "Los campos con * son obligatorios",
          icon: "error",
          confirmButtonColor: "#ff00008f",
          confirmButtonText: "Aceptar",
          customClass: {
            popup: 'textFalla'
          }
        });

      }
      else {
        console.log(productoActualizar)
        const response = await axios.put(urlBackend + 'products/update-product', productoActualizar);
        console.log(response);
        setEstados((prevState) => ({
          ...prevState,
          validacion: true,
          error: false,
        }));
        Swal.fire({
          title: "Actualizado",
          text: "El producto se actualizo correctamente",
          icon: "success",
          confirmButtonColor: "#008000a9",
          customClass: {
            popup: 'textExito'
          }

        });

        setTimeout(() => {
          navigate('/pageAdmin/');
          window.location.reload()
        }, 2000);
        setProductoActualizar({
          id: "",
          name: "",
          category: {
            id: ""

          },
          description: "",
          price: "",
          type: "",
          console: "",
          images: [
            { imageUrl: "" },
            { imageUrl: "" },
            { imageUrl: "" },
            { imageUrl: "" },
            { imageUrl: "" }
          ],
          characteristics: []
        })
      }
    }
    catch (error) {
      console.error('Error:', error.message);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#ff00008f",
        customClass: {
          popup: 'textFallaServer'
        }
      });
    }
  }

  const handleOnchangeId = (e) => {
    setEstados({ validacion: false, error: false })
  }

  const handleCambioName = (e) => {
    setProductoActualizar((prevState) => ({ ...prevState, name: e.target.value.trimStart() }))
    setEstados({ validacion: false, error: false })
  }


  const handleOnchangeCategoria = (e) => {
    setProductoActualizar((prevState) => ({ ...prevState, category: { id: e.target.value.trimStart() } }))
  }
  const handleOnchangeDescripcion = (e) => {
    setProductoActualizar((prevState) => ({ ...prevState, description: e.target.value.trimStart() }))
    setEstados({ validacion: false, error: false })
  }
  const handleOnchangePrecio = (e) => {
    setProductoActualizar((prevState) => ({ ...prevState, price: e.target.value.trimStart() }))
    setEstados({ validacion: false, error: false })
  }
  const handleOnchangeTipo = (e) => {
    setProductoActualizar((prevState) => ({ ...prevState, type: e.target.value.trimStart() }))
    setEstados({ validacion: false, error: false })
  }
  const handleOnchangeConsola = (e) => {
    setProductoActualizar((prevState) => ({ ...prevState, console: e.target.value.trimStart() }))
    setEstados({ validacion: false, error: false })
  }


  const handleImageChange = (index, e) => {
    setEstados({ validacion: true, error: false })
    const { name, value } = e.target;
    const imagesCopy = [...productoActualizar.images];
    imagesCopy[index] = { ...imagesCopy[index], [name]: value.trimStart() };
    setProductoActualizar(prevState => ({ ...prevState, images: imagesCopy }));
  };


  // const handleCheckboxChange = (e) => {
  //   const { value, checked } = e.target;

  //   // Dividir la cadena del value en dos valores
  //   const [id, name, description] = value.split('-');

  //   let updatedCharacteristics;

  //   if (checked) {
  //     updatedCharacteristics = [...productoActualizar.characteristics, { id, name, description }];
  //   } else {
  //     updatedCharacteristics = productoActualizar.characteristics.filter((char) => char.id !== id);
  //   }

  //   setProductoActualizar((prevState) => ({ ...prevState, characteristics: updatedCharacteristics }));
  // };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
  
    // Dividir la cadena del value en tres valores
    const [id, name, description] = value.split('-');
  
    let updatedCharacteristics;
  
    if (checked) {
      updatedCharacteristics = [...productoActualizar.characteristics, { id, name, description }];
    } else {
      updatedCharacteristics = productoActualizar.characteristics.filter((char) => char.id !== id);
    }
  
    setProductoActualizar((prevState) => ({ ...prevState, characteristics: updatedCharacteristics }));
  };



  return (


    <div className={styles.divAddProduct}>

      <form className={styles.formularioAddProducto}>
        <h3 className={styles.tituloFormulario}>Editar Producto</h3>

        {/* Imputs de datos */}
        <div className={styles.contenedorInputDatos}>
          <input  className={styles.inputName}placeholder="Nombre *" value={productoActualizar.name} onChange={handleCambioName} />

          {/* <input className="inputCategoria" placeholder="Id categoria " value={productoNuevo.category.id} onChange={handleOnchangeCategoria}/> */}

          <input className={styles.inputPrecio} placeholder="Precio USD *" value={productoActualizar.price} onChange={handleOnchangePrecio} />
          <input className={styles.inputTipo} placeholder="Tipo *" value={productoActualizar.type} onChange={handleOnchangeTipo} />

          <select onChange={handleOnchangeCategoria} className={styles.inputCategoria} value={productoActualizar.category.id}>
            <option value="">Categoría</option>
            {state.categorias.slice(1).map((categoria, index) => (
              <option key={index} value={categoria.id}>
                {categoria.title}
              </option>
            ))}
          </select>

          <select className={styles.inputConsola} value={productoActualizar.console} onChange={handleOnchangeConsola}>

            <option value="">Consola *</option>
            <option value="Play Station 4">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="PC">PC</option>
          </select>
        </div>

        {/* Imputs de Imagenes */}
        <div className={styles.contenedorInputImgText}>
          <div className={styles.contenedorInputImg}>
            <input className={styles.inputImage1} placeholder="URL Image1 *" name='imageUrl' value={productoActualizar.images[0].imageUrl} onChange={(e) => handleImageChange(0, e)} />
            <input className={styles.inputImage2} placeholder="URL Image2 *" name='imageUrl' value={productoActualizar.images[1].imageUrl} onChange={(e) => handleImageChange(1, e)} />
            <input className={styles.inputImage3} placeholder="URL Image3 *" name='imageUrl' value={productoActualizar.images[2].imageUrl} onChange={(e) => handleImageChange(2, e)} />
            <input className={styles.inputImage4} placeholder="URL Image4 *" name='imageUrl' value={productoActualizar.images[3].imageUrl} onChange={(e) => handleImageChange(3, e)} />
            <input className={styles.inputImage5} placeholder="URL Image5 *" name='imageUrl' value={productoActualizar.images[4].imageUrl} onChange={(e) => handleImageChange(4, e)} />
          </div>
          <textarea className={styles.inputDescripcion} placeholder="Descripcion *" value={productoActualizar.description} onChange={handleOnchangeDescripcion} />
        </div>

        <div className={styles.contenedorCaracteristicas}>
          <h5 className={styles.tituloCheckbox}>Caracteristicas</h5>
          <div className={styles.contenedorCaracteristicaCheckbox}>
            {state.caracteristicas.map((caracteristica, index) => (
              <label className={styles.contenedorCheckbox} key={index}>
                <input className={styles.inputCheckbox} type="checkbox" value={caracteristica.id} onChange={handleCheckboxChange} />
                <span className={styles.nombreCaracteristica}>{caracteristica.name}</span>
              </label>

            ))}
          </div>
        </div>
        {/* <div className={styles.contenedorCaracteristicas}>
          <h5 className={styles.tituloCheckbox}>Caracteristicas</h5>
          <div className={styles.contenedorCaracteristicaCheckbox}>
            {state.caracteristicas.map((caracteristica, index) => (
              <label className={styles.contenedorCheckbox} key={index}>
                <input
                  className={styles.inputCheckbox}
                  type="checkbox"
                  value={caracteristica.id}
                  onChange={handleCheckboxChange}
                  checked={productoActualizar.characteristics.some(char => char.id === caracteristica.id)}
                />
                <span className={styles.nombreCaracteristica}>{caracteristica.name}</span>
              </label>
            ))}
          </div>
        </div> */}




        <button onClick={handleSubmit} className={styles.guardarProducto}>Grabar</button>
      </form>
    </div>

  )
}

export default EditarProducto