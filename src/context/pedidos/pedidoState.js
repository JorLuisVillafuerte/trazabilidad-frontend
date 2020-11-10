import React, { useReducer } from 'react'
//import {v4 as uuidv4} from 'uuid';
import pedidoContext from './pedidoContext';
import pedidoReducer from './pedidoReducer';

import {
    MOSTRAR_SELECCIONADO,
    BUSCAR_PEDIDO,
    RESET_BUSCAR,
    SET_ID_MODAL,
    OBTENER_PEDIDOS,
    ERROR_PEDIDOS,
    EDITAR_PEDIDO,
    ELIMINAR_PEDIDO,
    AGREGAR_PEDIDO,
    PEDIDO_SEL
} from '../../types';
import clienteAxios from '../../config/axios';

//STATE INICIAL DE PEDIDOS
const PedidoState = props => {

    //ESTADO INICIAL
    const initialState = {
        pedidos : [],
        seleccionado: null,
        //pedidoBuscado: null,
        msg: null,
    }

    //DISPATCH PARA EJECUTAR ACCIONES 
    const [state, dispatch] = useReducer(pedidoReducer, initialState);

    //SERIE DE FUNCIONES PARA EL CRUD
    const obtenerPedidos = async() => {
        try {
            const respuesta = await clienteAxios.get('pedidos/');
            console.log(respuesta.data);
            dispatch({
                type: OBTENER_PEDIDOS,
                payload: respuesta.data
            });
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: 'Ocurrio un error al cargar los registros.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_PEDIDOS,
                payload: alerta
            });
        }

    }
    
    //SERIE DE FUNCIONES PARA EL CRUD
    const agregarPedido = async(pedido) => {
        try {
            //console.log(pedido);
            //console.log(respuesta.data);
            var contador = 0;
            var contadorpedido = 0;
            const productos = await clienteAxios.get('productos/');
            productos.data.forEach(prd => {
                for (let x = 0; x < pedido.length; x++) {
                    contadorpedido++;
                    if(prd.codProducto === pedido[x].codProducto){
                        pedido[x].codProducto = prd.idproducto;
                        contador++;
                    }
                    
                }
            });
            /*if(contador !== contadorpedido){

                const alerta = {
                    msg: 'Uno o los productos ingresados no existen.',
                    categoria: 'alerta-error'
                }
                dispatch({
                    type: ERROR_PEDIDOS,
                    payload: alerta
                });
                return null;
            }else{*/
            const pedidoRespuesta = await clienteAxios.post('pedidos/',pedido[0]);
            let pedidoDetalle = [];
            for (let x = 0; x < pedido.length; x++) {
                const obj = {
                    idpedido: pedidoRespuesta.data.idpedido,
                    idproducto: Number(pedido[x].codProducto),
                    cantidad: pedido[x].cantidad,
                    unidades: pedido[x].unidades
                }
                pedidoDetalle.push(obj);
                
            }
            await clienteAxios.post('pedidoDetalle/all',pedidoDetalle);
            console.log(pedidoRespuesta.data);
            dispatch({
                type: AGREGAR_PEDIDO,
                payload: pedidoRespuesta.data
            });
            return true;
            

        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: 'Ocurrio un error al agregar los pedidos.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_PEDIDOS,
                payload: alerta
            });
            return null;
        }

    }

    
    //SERIE DE FUNCIONES PARA EL CRUD
    const obtenerPedidosDetallePorId = async(id,galpon) => {
        try {
            const respuesta = await clienteAxios.get(`pedidoDetalle/idpedido/${id}`);
            console.log(respuesta.data)
            respuesta.data.galpon = galpon;
            dispatch({
                type: PEDIDO_SEL,
                payload: respuesta.data
            })
            return true;
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: 'Ocurrio un error al cargar el pedido.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_PEDIDOS,
                payload: alerta
            });
            return null;
        }

    } 
    const editarPedido = async(pedido) => {
        try {
            const respuesta = await clienteAxios.post('pedidos/', pedido);
            console.log(respuesta.data);
            dispatch({
                type: EDITAR_PEDIDO,
                payload: respuesta.data
            });
            return true;
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: 'Ocurrio un error al editar el registro.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_PEDIDOS,
                payload: alerta
            });
            return false;
        }

    } 
    const eliminarPedido = async(pedido) => {
        try {
            const respuesta = await clienteAxios.delete(`pedidos/id/${pedido.idpedido}`);
            console.log(respuesta.data);
            dispatch({
                type: ELIMINAR_PEDIDO,
                payload: pedido.idpedido
            });
            return true;
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: 'Ocurrio un error al eliminar el registro.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR_PEDIDOS,
                payload: alerta
            });
            return false;
        }

    } 

    const mostrarSeleccionado = (dato) => {
        dispatch({
            type: MOSTRAR_SELECCIONADO,
            payload: dato
        })
    }
    const buscarPedido = (dato) => {
        /*console.log(dato);
        var pedidofiltrado = pedidos.filter(p=>(p.id === Number(dato)))
        console.log(pedidofiltrado);
        dispatch({
            type: BUSCAR_PEDIDO,
            payload: pedidofiltrado
        })*/
    }
    const resetBusqueda = () => {
        /*  
        dispatch({
            type: RESET_BUSCAR,
            payload: pedidos
        })*/
    }

    return(
        <pedidoContext.Provider
            value={{
                pedidos: state.pedidos,
                msg: state.msg,
                seleccionado: state.seleccionado,
                mostrarSeleccionado,
                buscarPedido,
                resetBusqueda,
                obtenerPedidos,
                editarPedido,
                eliminarPedido,
                obtenerPedidosDetallePorId,
                agregarPedido
            }}
        >
            {props.children}
        </pedidoContext.Provider>
    )

}
export default PedidoState;