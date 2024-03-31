import React,{ useEffect, useState } from 'react';
import Start from './Start';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Rating = () => {

//Estado para almacenar el comentario de la calificacion
const [comentarioCalificacion, setComentarioCalificacion]=useState()
        
     // Estado para almacenar la calificación
  const [calificacion, setCalificacion] = useState(0);

  // Estado para mostrar el input de comentario cuando hace click a las estrellas
  const [isInputCalificacion, setInputCalificacion]=useState(false)

  // Estado para almacenar las calificaciones del producto
  const[calificacionesDelProducto, setCalificacionesDelProducto]=useState([])

  // Estado para almacenar las calificaciones del producto
  const[calificacionXUsuario, setCalificacionXUsuario]=useState({})

    // Estado para validar si el producto ya ha sido calificado por el usuario logueado
  const[isCalificado, setIsCalificado]=useState(false)
  
  // Función para manejar el clic en una estrella
  const handleClick = (index) => {
    // Actualiza la calificación al índice de la estrella + 1
    setCalificacion(index + 1);
    setInputCalificacion(true)
  };

  const handleOnChangeInputCalificacion=(e)=>{
    setComentarioCalificacion(e.target.value)
  }

  const params=useParams()
  console.log(params.id)

// UseEffect que se ejecuta cada que se actualiza el componente, llama la api que trae las calificaciones del producto y lo setea el array a un estado local

useEffect(()=>{
    try {
        axios.get("http://localhost:8080/calificaciones/calificacionDeUnProducto/" + params.id)
        .then((response)=>{
            console.log("Respuesta del backend listado de calificaciones del usuario logueado",response.data)
            setCalificacionesDelProducto(response.data)
        })
        .catch((error) => {
            console.log("Error", error);
        });  
    } 
    catch (error) {
       console.log("Error", error) 
    }
    
},[])

console.log("calificaciones del producto seteado al estado del componente rating ", calificacionesDelProducto);

//UseEffect para validar que el usuario ya ha calificado el producto y setea isCalificado a true

useEffect(() => {
    const calificacionDelUsuario = calificacionesDelProducto.find((califi) => califi.username === localStorage.getItem("username"));
    console.log(calificacionDelUsuario);
    setCalificacionXUsuario(calificacionDelUsuario)
    if (calificacionDelUsuario) {
        setIsCalificado(true);
        setCalificacion(calificacionDelUsuario.valorCalificacion);
    }
    else{
        setIsCalificado(false)
    }
}, [calificacionesDelProducto]); 

console.log(isCalificado);


const handleOnclickCalificacion = async () => {
    setInputCalificacion(false);
    if(isCalificado){
        Swal.fire({
            title: "Producto ya calificado",
            text: "Ya has calificado este producto anteriormente.",
            icon: "warning",
            confirmButtonColor: "#ff00008f",
            customClass: {
                popup: 'textFallaServer'
            }
        });
        setCalificacion(calificacionXUsuario.valorCalificacion)
    }
    else{
        try {
            const response = await axios.post('http://localhost:8080/calificaciones/calificar', {
            username: localStorage.getItem("username"),
            productoId: params.id,
            valorCalificacion: calificacion,
            comentario: comentarioCalificacion,
        });
            Swal.fire("¡Calificado!", "Tu calificación ha sido guardada.", "success");
            console.log(response);
            window.location.reload()
        } 
        catch (error) {
            console.log("Error al calificar", error);
            Swal.fire({
                title: "El producto debe tener una reserva y esta haber finalizado",
                text: error,
                icon: "error",
                confirmButtonColor: "#ff00008f",
                customClass: {
                    popup: 'textFallaServer'
                }
            });
            setCalificacion(0)
        }
    }
   
};

  return (

    localStorage.getItem("username") !=null &&

    <div className='contenedorCalificacion'>
    
    {/* Mapea cinco estrellas y renderiza cada una */}
    {[...Array(5)].map((_, index) => (
      <Start
        key={index}

        // La estrella está seleccionada si su índice es menor que la calificación actual
        selected={index < calificacion}
        onClick={() => handleClick(index)} // Manejador de clic para cambiar la calificación
        //disabled={isCalificado} // desabilitar las estrellas si ya esta calificado
      />
    ))}
    {/* Muestra la calificación actual */}
    
    <p className='subtituloCalificacion'> valor: {isCalificado ? calificacionXUsuario.valorCalificacion: calificacion}</p>

    {isInputCalificacion && 
    <div >
        <input onChange={handleOnChangeInputCalificacion} className='inputComentarioCalificacion' placeholder='Escribe un comentario'></input>
        <button onClick={handleOnclickCalificacion} className='botonCalificar'>Calificar</button>
    </div>
    }

  </div>
  )
}

export default Rating