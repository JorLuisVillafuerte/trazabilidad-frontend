import {MOSTRAR_SELECCIONADO, BUSCAR_PEDIDO, RESET_BUSCAR, OBTENER_PEDIDOS, ERROR_PEDIDOS,EDITAR_PEDIDO,ELIMINAR_PEDIDO, AGREGAR_PEDIDO, PEDIDO_SEL} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case OBTENER_PEDIDOS: 
            return {
                ...state,
                pedidos: action.payload,
                msg: null
            }
        case AGREGAR_PEDIDO: 
            return {
                ...state,
                pedidos: [...state.pedidos, action.payload],
                msg: null
            }
        case EDITAR_PEDIDO: 
            return {
                ...state,
                pedidos: state.pedidos.map(pedido => pedido.idpedido === action.payload.idpedido ? action.payload : pedido)
            }
        case ELIMINAR_PEDIDO:
            return {
                ...state,
                pedidos: state.pedidos.filter(pedido => pedido.idpedido !== action.payload)
            }
        case OBTENER_PEDIDOS: 
            return {
                ...state,
                pedidos: action.payload,
                msg: null
            }
        case ERROR_PEDIDOS: 
            return {
                ...state,
                msg: action.payload,
            }
        case PEDIDO_SEL:
            return {
                ...state,
                seleccionado: action.payload
            }
        case BUSCAR_PEDIDO:
            console.log(action.payload);
            return {
                ...state,
                pedidos: action.payload
            }
        case RESET_BUSCAR:
            return {
                ...state,
                pedidos: action.payload
            }

        default:
            return state;
    }
}