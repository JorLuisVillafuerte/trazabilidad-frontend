import React, { useReducer } from 'react'
import usuarioContext from './usuarioContext';
import usuarioReducer from './usuarioReducer';

import { ELIMINAR_PEDIDO, OBTENER_USUARIOS, ERROR, EDITAR_USUARIO, ELIMINAR_USUARIO, AGREGAR_USUARIO} from '../../types';
import clienteAxios from '../../config/axios';

//STATE INICIAL DE PEDIDOS
const UsuarioState = props => {

    //ESTADO INICIAL
    const initialState = {
        usuarios : [],
        msg: null,
    }

    //DISPATCH PARA EJECUTAR ACCIONES 
    const [state, dispatch] = useReducer(usuarioReducer, initialState);

    //SERIE DE FUNCIONES PARA EL CRUD
    const obtenerUsuarios = async() => {
        try {
            const respuesta = await clienteAxios.get('usuarios/');
            console.log(respuesta.data);
            dispatch({
                type: OBTENER_USUARIOS,
                payload: respuesta.data
            });
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: 'Ocurrio un error al cargar los registros.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR,
                payload: alerta
            });
        }

    } 
    const agregarUsuario = async(usuario) => {
        try {
            const respuesta = await clienteAxios.post('usuarios/', usuario);
            console.log(respuesta.data);
            //PASAR EL USUARIO AGREGADO A LA VARIABLE GLOBAL "USUARIOS"
            dispatch({
                type: AGREGAR_USUARIO,
                payload: respuesta.data
            });
            return true;
        } catch (error) {
            //OCURRIO UN ERROR
            console.log(error.response);
            //ARMAMOS MENSAJE DE ERROR
            const alerta = {
                msg: 'Ocurrio un error al crear el registro.',
                categoria: 'alerta-error'
            }
            //PASAMOS EL MENSAJE DE ERROR A PAYLOAD Y DEPUES PAYLOAD A -> MSG
            dispatch({
                type: ERROR,
                payload: alerta
            });
            return false;
        }

    }
    const editarUsuario = async(usuario) => {
        try {
            console.log('iniciando edicion de usuario')
            const respuesta = await clienteAxios.post('usuarios/', usuario);
            console.log(respuesta.data);
            dispatch({
                type: EDITAR_USUARIO,
                payload: respuesta.data
            });
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: 'Ocurrio un error al editar el registro.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR,
                payload: alerta
            });
        }

    } 
    const eliminarUsuario = async(usuario) => {
        try {
            const respuesta = await clienteAxios.delete(`usuarios/id/${usuario.idusuario}`);
            console.log(respuesta.data);
            dispatch({
                type: ELIMINAR_USUARIO,
                payload: usuario.idusuario
            });
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: 'Ocurrio un error al eliminar el registro.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR,
                payload: alerta
            });
        }

    } 

    return(
        <usuarioContext.Provider
            value={{
                usuarios: state.usuarios,
                msg: state.msg,
                obtenerUsuarios,
                editarUsuario,
                eliminarUsuario,
                agregarUsuario
            }}
        >
            {props.children}
        </usuarioContext.Provider>
    )

}
export default UsuarioState;