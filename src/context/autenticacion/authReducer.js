import { REGISTRO_ERROR, LOGIN_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, CERRAR_SESION } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                autenticado: true,
                msg: null,
                cargando: false
            }
        case CERRAR_SESION:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                msg: action.payload,
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
        default:
            return state;
    }
}