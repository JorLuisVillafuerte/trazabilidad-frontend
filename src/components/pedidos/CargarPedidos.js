import React, { useContext, Fragment } from 'react';
import Dropzone from '../util/Dropzone';
import AuthContext from '../../context/autenticacion/authContext';

const CargarPedidos = () => {
    const authContext = useContext(AuthContext); 
    const {usuario} = authContext;
    if(usuario.cargo == 'jefeproduccion' || usuario.cargo == 'admin'){
        return ( 
            <Fragment>
                <h1>CARGAR PEDIDOS</h1>
                <Dropzone/>
            </Fragment>
            
         );

    }else{
        return ( 
            <Fragment>
                <h1>No tienes los permisos para esta funcion</h1>
            </Fragment>
            
         );
    }
}
 
export default CargarPedidos;