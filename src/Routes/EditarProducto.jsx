import React,{useEffect,useState} from 'react'
import { useParams} from 'react-router-dom'
import { useContextGlobal } from '../components/Util/global.context'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {

  const params=useParams()

  const {state,dispatch}=useContextGlobal()

  const navigate = useNavigate();

  const endPointDetail=`http://localhost:8080/products/search-id/${params.id}`

  console.log(params.id)

//   useEffect(()=>{
//      const response= axios(endPointDetail)
//     .then( res => dispatch({ type: 'get_producto', payload: res.data }))
//     .catch(error => console.error("Error fetching product details:", error));

// }, [endPointDetail, dispatch]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios(endPointDetail);
      dispatch({ type: 'get_producto', payload: response.data });
      console.log(response.data);
      setProductoActualizar((prevState)=>({
        ...prevState,
        id:response.data.id,
       name:response.data.name,
       description:response.data.description,
       price:response.data.price,
       console:response.data.console,
       images:response.data.images,
       type:response.data.type,
      }))
      console.log(productoActualizar)
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
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
    {  imageUrl: "" },
    {  imageUrl: "" },
    {  imageUrl: "" },
    {  imageUrl: "" },
    {  imageUrl: ""}
  ],
  characteristics: []
});




const[estados,setEstados]=useState({
validacion:false,
error:false,
})

const handleSubmit= async(e)=>{
  e.preventDefault()
  try{
      if(productoActualizar.name===""  || productoActualizar.description==="" /*Pendiente agregar validaciones del id y product de las imagenes*/
      || productoActualizar.price==="" ||productoActualizar.type==="" || productoActualizar.console==="" || productoActualizar.images[0].imageUrl==="" 
      || productoActualizar.images[1].imageUrl==="" || productoActualizar.images[2].imageUrl==="" || productoActualizar.images[3].imageUrl==="" || productoActualizar.images[4].imageUrl===""){
          setEstados((prevState)=>({
              ...prevState,
              validacion:false,
              error:true,
          }))
          Swal.fire({
              title: "Actualizacion fallo",
              text: "Los campos con * son obligatorios",
              icon: "error",
              confirmButtonColor: "#ff00008f",
              confirmButtonText: "Aceptar",
              customClass: {
                  popup:'textFalla'
              }
            });

      }
      else{
          console.log(productoActualizar)
          const response = await axios.put('http://localhost:8080/products/update-product', productoActualizar);
          console.log(response);
          setEstados((prevState)=>({
              ...prevState,
              validacion:true,
              error:false,
          }));
          Swal.fire({
              title: "Actualizado",
              text: "El producto se actualizo correctamente",
              icon: "success",
              confirmButtonColor: "#008000a9",
              customClass: {
                  popup:'textExito'
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
              {  imageUrl: "" },
              {  imageUrl: "" },
              {  imageUrl: "" },
              {  imageUrl: "" },
              {  imageUrl: ""}
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
              popup:'textFallaServer'
          }
      });
  }  
}  

const handleOnchangeId=(e)=>{  
  setEstados({validacion:false, error:false})
}

const handleCambioName=(e)=> {
  setProductoActualizar((prevState) => ({ ...prevState, name: e.target.value.trimStart() }))
  setEstados({validacion:false, error:false})
}


const handleOnchangeCategoria=(e)=>{
  setProductoActualizar((prevState) => ({ ...prevState, category:{id: e.target.value.trimStart() }}))
}
const handleOnchangeDescripcion=(e)=>{
  setProductoActualizar((prevState) => ({ ...prevState, description: e.target.value.trimStart() }))
  setEstados({validacion:false, error:false})
} 
const handleOnchangePrecio=(e)=> {
  setProductoActualizar((prevState) => ({ ...prevState, price: e.target.value.trimStart() }))
  setEstados({validacion:false, error:false})
}
const handleOnchangeTipo=(e)=> {
  setProductoActualizar((prevState) => ({ ...prevState, type: e.target.value.trimStart() }))
  setEstados({validacion:false, error:false})
}
const handleOnchangeConsola=(e)=> {
  setProductoActualizar((prevState) => ({ ...prevState, console: e.target.value.trimStart() }))
  setEstados({validacion:false, error:false})
}


const handleImageChange = (index, e) => {
  setEstados({validacion:true, error:false})
   const { name, value } = e.target;
   const imagesCopy = [...productoActualizar.images];
   imagesCopy[index] = { ...imagesCopy[index], [name]: value.trimStart() };
   setProductoActualizar(prevState => ({ ...prevState, images: imagesCopy }));
};


const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;

  // Dividir la cadena del value en dos valores
  const [id, name,description] = value.split('-');

  let updatedCharacteristics;

  if (checked) {
      updatedCharacteristics = [...productoActualizar.characteristics, { id, name, description }];
  } else {
      updatedCharacteristics = productoActualizar.characteristics.filter((char) => char.id !== id);
  }

  setProductoActualizar((prevState) => ({ ...prevState, characteristics: updatedCharacteristics }));
};




  return (
    <div className='pageEditar'>

      <Link to={'/pageAdmin/'} ><button className='botonAtrasEditar'>Atras</button></Link>
      

      <div className="contenedorActualizar">

        <form className="formularioActualizarProducto">
          
          <h3 className="tituloFormulario">Actualizar Producto</h3>

          <div className="inputName">
          <label> <b>ID Producto</b></label>
          <input className="inputActualizar" placeholder="Id *" value={productoActualizar.id} onChange={handleOnchangeId} />
          </div>

          <div className="inputName">
          <label><b>Nombre</b></label>
          <input className="inputActualizar" placeholder="Nombre *" value={productoActualizar.name} onChange={handleCambioName} />
          </div>

          <div className="inputTipo">
          <label><b>Tipo</b></label>
          <input className="inputActualizar" placeholder="Tipo *" value={productoActualizar.type} onChange={handleOnchangeTipo} />
          </div>
          
          <div className="inputCategoria">
          <label><b>Categoria</b></label>
          <select className="inputActualizar" onChange={handleOnchangeCategoria}>
                <option  value="">Categoría</option>
                {state.categorias.slice(1).map((categoria, index) => (
                <option key={index} value={categoria.id}>{categoria.title}</option>
                
               
                 ))}
            
          </select>
          </div>
          
                     
          
          
          <div className="inputPrecio">
          <label> <b>Precio</b></label>
          <input className="inputActualizar" placeholder="Precio USD *" value={productoActualizar.price} onChange={handleOnchangePrecio} />
          </div>
            
          <div className="inputCategoria">
          <label ><b>Consola</b></label>
          <select className="inputActualizar" value={productoActualizar.console} onChange={handleOnchangeConsola}>
            <option value="">Consola *</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="PC">PC</option>
          </select>
          </div>

          <div className="inputImage1">
          <label ><b>Url Img</b></label>
          <input className="inputActualizar" placeholder="URL Image1 *" name='imageUrl' value={productoActualizar.images[0].imageUrl} onChange={(e) => handleImageChange(0, e)} />
          </div>

          <div className="inputImage2">
          <label ><b>Url Img</b></label>
          <input className="inputActualizar" placeholder="URL Image2 *" name='imageUrl' value={productoActualizar.images[1].imageUrl} onChange={(e) => handleImageChange(1, e)} />
          </div>

          <div className="inputImage3">
          <label><b>Url Img</b></label>
          <input className="inputActualizar" placeholder="URL Image3 *" name='imageUrl' value={productoActualizar.images[2].imageUrl} onChange={(e) => handleImageChange(2, e)} />
          </div>

          <div className="inputImage4">
          <label><b>Url Img</b> </label>
          <input className="inputActualizar" placeholder="URL Image4 *" name='imageUrl' value={productoActualizar.images[3].imageUrl} onChange={(e) => handleImageChange(3, e)} />
          </div>

          <div className="inputImage5">
          <label><b>Url Img</b></label>
          <input className="inputActualizar" placeholder="URL Image5 *" name='imageUrl' value={productoActualizar.images[4].imageUrl} onChange={(e) => handleImageChange(4, e)} />
          </div>
          
          <div className="inputDescripcion">
           <label className="labelActualizarProducto"><b>Descripción</b></label>
          <textarea className="inputActualizarDescripcion" placeholder="Descripcion *" value={productoActualizar.description} onChange={handleOnchangeDescripcion} />
          </div>

          {console.log(productoActualizar.characteristics)}
          
          <div className="contenedorCaracteristicaCheckbox">
                <h5 className="tituloCheckbox"><b>Caracteristicas</b></h5>
                {state.caracteristicas.map((caracteristica, index)=>(
                    <label className='contenedorCheckbox' key={index}>
                        <input className='inputCheckbox' type="checkbox" value={`${caracteristica.id}-${caracteristica.name}-${caracteristica.description}`} onChange={handleCheckboxChange} />
                        <span className="nombreCaracteristica">{caracteristica.name}</span>

                    </label>
                ))}

           </div>

          
           
          <button onClick={handleSubmit} className='botonActualizar'>Actualizar</button>
        </form>



      </div>




    </div>
  )
}

export default EditarProducto