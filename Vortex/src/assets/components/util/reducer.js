
const reducer = (state,action) => {
  switch(action.type){
    case 'get_productos':
        return{...state,productos:action.payload}
    default:
        break;    
  }
}

export default reducer