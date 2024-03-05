
const reducer = (state,action) => {
  switch(action.type){
    case 'get_productos':
        return{...state,productos:action.payload}
    case 'get_producto':
        return{...state,producto:action.payload}
    case 'delete_product':
        return{...state,productos: state.productos.filter(producto => producto.id !== action.payload)}  
    case 'change_theme':
        return{...state,theme:action.payload}           
    default:
        break;    
  }
}

export default reducer