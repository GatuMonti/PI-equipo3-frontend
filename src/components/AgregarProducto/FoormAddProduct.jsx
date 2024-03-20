import React, { useState, useEffect } from 'react'
import axios, { formToJSON } from 'axios'
import Swal from 'sweetalert2'
import { useContextGlobal } from '../Util/global.context'
import styles from './addProduct.module.css'

function FoormAddProduct() {

    const { state } = useContextGlobal()

    const [productoNuevo, setProductoNuevo] = useState({
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
        characteristics: [
        ]
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (productoNuevo.name === "" || productoNuevo.description === ""
                || productoNuevo.price === "" || productoNuevo.type === "" || productoNuevo.console === "" || productoNuevo.images[0].imageUrl === ""
                || productoNuevo.images[1].imageUrl === "" || productoNuevo.images[2].imageUrl === "" || productoNuevo.images[3].imageUrl === "" || productoNuevo.images[4].imageUrl === "") {
                Swal.fire({
                    title: "Registro fallo",
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
                console.log(productoNuevo)
                const response = await axios.post('http://localhost:8080/products/add-product', productoNuevo);
                console.log(response);
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
                Swal.fire({
                    title: "Registrado",
                    text: "El producto se registró correctamente",
                    icon: "success",
                    confirmButtonColor: "#008000a9",
                    customClass: {
                        popup: 'textExito'
                    }

                });
                setProductoNuevo({
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
            if (error.response.status === 400) {
                Swal.fire({
                    title: "Error",
                    text: "El juego ya se encuentra registrado",
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    customClass: {
                        popup: 'textFallaServer'
                    }
                });
            } else {
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
            setProductoNuevo({
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

    const handleOnchangeName = (e) => {
        setProductoNuevo((prevState) => ({ ...prevState, name: e.target.value.trimStart() }))
    }
    const handleOnchangeCategoria = (e) => {
        setProductoNuevo((prevState) => ({ ...prevState, category: { id: e.target.value.trimStart() } }))
    }

    //  const handleOnchangeCategoria = (e) => {
    //      const categoryId = e.target.value;
    //      setProductoNuevo(prevState => ({
    //          ...prevState,
    //          category: {
    //              id: categoryId
    //          }
    //      }));
    //  };


    const handleOnchangeDescripcion = (e) => {
        setProductoNuevo((prevState) => ({ ...prevState, description: e.target.value.trimStart() }))
    }
    const handleOnchangePrecio = (e) => {
        setProductoNuevo((prevState) => ({ ...prevState, price: e.target.value.trimStart() }))
    }
    const handleOnchangeTipo = (e) => {
        setProductoNuevo((prevState) => ({ ...prevState, type: e.target.value.trimStart() }))
    }
    const handleOnchangeConsola = (e) => {
        setProductoNuevo((prevState) => ({ ...prevState, console: e.target.value.trimStart() }))
    }


    const handleImageChange = (index, e) => {
        const { name, value } = e.target;
        const imagesCopy = [...productoNuevo.images];
        imagesCopy[index] = { ...imagesCopy[index], [name]: value.trimStart() };
        setProductoNuevo(prevState => ({ ...prevState, images: imagesCopy }));
    };


    //  const handleCaracteristicaChange = (index, e) => {
    //     const { value } = e.target;
    //     const characteristicsCopy = [...productoNuevo.characteristics];
    //     characteristicsCopy[index] = { id: value.trimStart() };
    //     setProductoNuevo(prevState => ({ ...prevState, characteristics: characteristicsCopy }));
    // };


    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let updatedCharacteristics;

        if (checked) {
            // Si el checkbox está marcado, agregamos la característica al estado productoNuevo
            updatedCharacteristics = [...productoNuevo.characteristics, { id: value }];
        } else {
            // Si el checkbox está desmarcado, filtramos la característica del estado productoNuevo
            updatedCharacteristics = productoNuevo.characteristics.filter((char) => char !== value);
        }

        setProductoNuevo(prevState => ({ ...prevState, characteristics: updatedCharacteristics }));
    };

    return (
        <div className={styles.divAddProduct}>

            <form className={styles.formularioAddProducto}>
                <h3 className={styles.tituloFormulario}>Agregar Producto</h3>

                {/* Imputs de datos */}
                <div className={styles.contenedorInputDatos}>
                    <input className={styles.inputName} placeholder="Nombre *" value={productoNuevo.name} onChange={handleOnchangeName} />

                    {/* <input className="inputCategoria" placeholder="Id categoria " value={productoNuevo.category.id} onChange={handleOnchangeCategoria}/> */}


                    {console.log(productoNuevo)}

                    <input className={styles.inputPrecio} placeholder="Precio USD *" value={productoNuevo.price} onChange={handleOnchangePrecio} />
                    <input className={styles.inputTipo} placeholder="Tipo *" value={productoNuevo.type} onChange={handleOnchangeTipo} />

                    <select onChange={handleOnchangeCategoria} className={styles.inputCategoria}>
                        <option value="">Categoría</option>
                        {state.categorias.slice(1).map((categoria, index) => (
                            <option key={index} value={categoria.id}>{categoria.title}</option>


                        ))}

                    </select>

                    <select className={styles.inputConsola} value={productoNuevo.console} onChange={handleOnchangeConsola}>
                        <option value="">Consola *</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="PC">PC</option>
                    </select>
                </div>

                {/* Imputs de Imagenes */}
                <div className={styles.contenedorInputImgText}>
                    <div className={styles.contenedorInputImg}>
                        <input className={styles.inputImage1} placeholder="URL Image1 *" name='imageUrl' value={productoNuevo.images[0].imageUrl} onChange={(e) => handleImageChange(0, e)} />
                        <input className={styles.inputImage2} placeholder="URL Image2 *" name='imageUrl' value={productoNuevo.images[1].imageUrl} onChange={(e) => handleImageChange(1, e)} />
                        <input className={styles.inputImage3} placeholder="URL Image3 *" name='imageUrl' value={productoNuevo.images[2].imageUrl} onChange={(e) => handleImageChange(2, e)} />
                        <input className={styles.inputImage4} placeholder="URL Image4 *" name='imageUrl' value={productoNuevo.images[3].imageUrl} onChange={(e) => handleImageChange(3, e)} />
                        <input className={styles.inputImage5} placeholder="URL Image5 *" name='imageUrl' value={productoNuevo.images[4].imageUrl} onChange={(e) => handleImageChange(4, e)} />

                    </div>
                    <textarea className={styles.inputDescripcion} placeholder="Descripcion *" value={productoNuevo.description} onChange={handleOnchangeDescripcion} />
                </div>
                {/* <input className="inputCaracteristicaAdd" placeholder="IdCaracterística " value={productoNuevo.characteristics.length > 0 ? productoNuevo.characteristics[0].id : ''} onChange={(e) => handleCaracteristicaChange(0, e)} />             */}

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
                <button onClick={handleSubmit} className={styles.guardarProducto}>Grabar</button>
            </form>
        </div>
    )

}

export default FoormAddProduct