const reducer = (state, action) => {
  switch (action.type) {
    case 'get_productos':
      return { ...state, productos: action.payload };
    case 'get_producto':
      return { ...state, producto: action.payload };
    case 'delete_product':
      return { ...state, productos: state.productos.filter(producto => producto.id !== action.payload) };
    case 'get_categorias': // Gatu: Obtener todas las categorías y guardarlas en el contexto global
      return { ...state, categorias: action.payload };
    case 'delete_categoria': // Gatu: Eliminar una categoría del contexto global
      return { ...state, categorias: state.categorias.filter(categoria => categoria.id !== action.payload) };
    case 'agregar_categoria': // Gatu: Agregar una categoría al contexto global
      return { ...state, categorias: [...state.categorias, action.payload] };
    case 'update_categoria': // Gatu Actualizar una categoría en el contexto global
      return {
        ...state,
        categorias: state.categorias.map(categoria => (categoria.id === action.payload.id ? action.payload : categoria))
      };
    case 'get_caracteristicas': // Gatu: Obtener todas las características y guardarlas en el contexto global
      return { ...state, caracteristicas: action.payload };
    case 'delete_caracteristica': // Gatu: Eliminar una característica del contexto global
      return { ...state, caracteristicas: state.caracteristicas.filter(caracteristica => caracteristica.id !== action.payload) };
    case 'agregar_caracteristica': // Gatu: Agregar una característica al contexto global
      return { ...state, caracteristicas: [...state.caracteristicas, action.payload] };
    case 'update_caracteristica': // Gatu: Actualizar una característica en el contexto global
      return {
        ...state,
        caracteristicas: state.caracteristicas.map(caracteristica => (caracteristica.id === action.payload.id ? action.payload : caracteristica))
      };
    case 'change_theme':
      return { ...state, theme: action.payload };
    case 'get_favorites':
      return { ...state, favoritos: action.payload};
    case 'set_isFavorite':
      return {...state, isFavorite: action.payload};
    default:
      break;
  }
};

export default reducer;

  
