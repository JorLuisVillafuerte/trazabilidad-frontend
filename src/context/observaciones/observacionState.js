import React, { useReducer } from 'react'
import observacionContext from './observacionContext';
import observacionReducer from './observacionReducer';
import clienteAxios from '../../config/axios';
import {
    AGREGAR_OBSERVACION,
    EDITAR_OBSERVACION,
    ELIMINAR_OBSERVACION,
    ERROR,
    OBTENER_OBSERVACIONES
} from '../../types';

//STATE INICIAL DE Observacion
const ObservacionState = props => {

    //ESTADO INICIAL
    const initialState = {
        observaciones : [],
        msg: null,
        //errorFormulario: false,
        //proyectoActual: null,
        //mensaje: null
    }

    //DISPATCH PARA EJECUTAR ACCIONES 
    const [state, dispatch] = useReducer(observacionReducer, initialState);

    //SERIE DE FUNCIONES PARA EL CRUD
    const obtenerObservaciones = async() => {
        try {
            const respuesta = await clienteAxios.get('observaciones/');
            console.log(respuesta.data);
            dispatch({
                type: OBTENER_OBSERVACIONES,
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
    
    const agregarObservacion  = async (observacion) => {
        try {
            observacion.idproducto = Number(observacion.idproducto);
            const respuesta = await clienteAxios.post('observaciones/', observacion);
            console.log(respuesta.data);
            dispatch({
                type: AGREGAR_OBSERVACION,
                payload: respuesta.data
            });
        } catch (error) {
            console.log(error.response);
            const alerta = {
                msg: 'Ocurrio un error al guardar el registro.',
                categoria: 'alerta-error'
            }
            dispatch({
                type: ERROR,
                payload: alerta
            });
        }

    }
    const validarObservacion = async (idpedido, idproducto, cantidadAIngresar, cantidadPedido) => {
        const respuesta = await clienteAxios.get('/observaciones/');
        let observaciones = respuesta.data;
        var cantidadIngresadas = 0; 
        if(observaciones.length === 0){
            return true;
        }else{
            let observacionesFiltrada = observaciones.filter(obs => obs.idpedido.idpedido == idpedido);
            observacionesFiltrada.map(obs =>{
                if(obs.idproducto.idproducto == idproducto){
                    cantidadIngresadas =  cantidadIngresadas + obs.cantidadPiezas;
                }
            });
            var total = Number(cantidadAIngresar)+Number(cantidadIngresadas);
            if(total > cantidadPedido){
                return false;
            }else{
                return true;
            }
        }
        
    }

    const editarObservacion= async(observacion) => {
        try {
            const respuesta = await clienteAxios.post('observaciones/', observacion);
            console.log(respuesta.data);
            dispatch({
                type: EDITAR_OBSERVACION,
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
    const eliminarObservacion = async(observacion) => {
        try {
            const respuesta = await clienteAxios.delete(`observaciones/id/${observacion.idobservacion}`);
            console.log(respuesta.data);
            dispatch({
                type: ELIMINAR_OBSERVACION,
                payload: observacion.idobservacion
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
        <observacionContext.Provider
            value={{
               observaciones: state.observaciones,
               msg: state.msg,
               agregarObservacion,
               obtenerObservaciones,
               editarObservacion,
               eliminarObservacion,
               validarObservacion
            }}
        >
            {props.children}
        </observacionContext.Provider>
    )

}
export default ObservacionState;