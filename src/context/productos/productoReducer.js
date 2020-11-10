import { EDITAR_PRODUCTO, ERROR, OBTENER_PRODUCTOS } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case OBTENER_PRODUCTOS: 
            return {
                ...state,
                productos: action.payload,
                msg: null
            }
        case EDITAR_PRODUCTO: 
            return {
                ...state,
                productos: state.productos.map(producto => producto.idproducto === action.payload.idproducto ? action.payload : producto)
            }
        case ERROR: 
            return {
                ...state,
                msg: action.payload,
            }


        default:
            return state;
    }
}