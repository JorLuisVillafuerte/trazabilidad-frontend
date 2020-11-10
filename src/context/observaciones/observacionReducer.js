import { AGREGAR_OBSERVACION, EDITAR_OBSERVACION, ELIMINAR_OBSERVACION, ERROR, OBTENER_OBSERVACIONES} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case OBTENER_OBSERVACIONES:
            return {
                ...state,
                observaciones: action.payload,
                msg: null
            }
        case AGREGAR_OBSERVACION:
            return {
                ...state,
                observaciones: [...state.observaciones, action.payload],
                msg: null
            }
        case EDITAR_OBSERVACION: 
            return {
                ...state,
                observaciones: state.observaciones.map(observacion => observacion.idobservacion === action.payload.idobservacion ? action.payload : observacion)
            }
        case ELIMINAR_OBSERVACION:
            return {
                ...state,
                observaciones: state.observaciones.filter(observacion => observacion.idobservacion !== action.payload)
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