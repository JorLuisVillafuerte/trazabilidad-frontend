import { AGREGAR_USUARIO, EDITAR_USUARIO, ELIMINAR_USUARIO, ERROR, OBTENER_USUARIO, OBTENER_USUARIOS } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case OBTENER_USUARIOS: 
            return {
                ...state,
                usuarios: action.payload,
                msg: null
            }
        case AGREGAR_USUARIO:
            return {
                ...state,
                usuarios: [...state.usuarios, action.payload],
                msg: null
        }
        case EDITAR_USUARIO: 
            return {
                ...state,
                usuarios: state.usuarios.map(usuario => usuario.idusuario === action.payload.idusuario ? action.payload : usuario)
            }
        case ELIMINAR_USUARIO:
            return {
                ...state,
                usuarios: state.usuarios.filter(usuario => usuario.idusuario !== action.payload)
            }
        case OBTENER_USUARIO: 
            return {
                ...state,
                usuarios: action.payload,
                msg: null
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