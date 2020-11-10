import React, { useContext, useEffect } from 'react';
import {Redirect, Route } from 'react-router-dom';
import AuthContext from '../context/autenticacion/authContext';


const PrivateRoute = ({component:Component, ...props}) => {
    const authContext = useContext(AuthContext); 
    const { autenticado, usuarioAutenticado, cargando } = authContext;
    
    useEffect(() => {
        usuarioAutenticado();
    }, []); 
    
    return ( 
        <Route {...props} render={props => !autenticado && !cargando ? (
            <Redirect to="/"/>
        ):(
            <Component {...props}/>
        )}/>
             
     );
}
 
export default PrivateRoute;