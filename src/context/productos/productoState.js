import React, { useReducer } from 'react'
import productoContext from './productoContext';
import productoReducer from './productoReducer';
import clienteAxios from '../../config/axios';
import { ERROR, OBTENER_PRODUCTOS,EDITAR_PRODUCTO } from '../../types';

//STATE INICIAL 
const ProductoState = props => {

    //ESTADO INICIAL
    const initialState = {
        productos : [],
        msg: null,
    }

    //DISPATCH PARA EJECUTAR ACCIONES 
    const [state, dispatch] = useReducer(productoReducer, initialState);

    //SERIE DE FUNCIONES PARA EL CRUD
    const obtenerProductos = async() => {
        try {
            const respuesta = await clienteAxios.get('productos/');
            console.log(respuesta.data);
            dispatch({
                type: OBTENER_PRODUCTOS,
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
    const editarProducto = async(producto) => {
        try {
            const respuesta = await clienteAxios.post('productos/', producto);
            console.log(respuesta.data);
            dispatch({
                type: EDITAR_PRODUCTO,
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

    return(
        <productoContext.Provider
            value={{
                productos: state.productos,
                msg: state.msg,
                obtenerProductos,
                editarProducto
            }}
        >
            {props.children}
        </productoContext.Provider>
    )

}
export default ProductoState;