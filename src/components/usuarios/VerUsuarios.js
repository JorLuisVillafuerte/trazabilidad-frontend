import React, { Fragment, useContext, useEffect } from 'react';
import TablaGestion from '../tablas/TablaGestion';
import UsuarioContext from '../../context/usuarios/usuarioContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { columnasUsuarios } from '../util/Columnas';
import AuthContext from '../../context/autenticacion/authContext';
const VerUsuarios = () => {
    
    const usuarioContext = useContext(UsuarioContext); 
    const {obtenerUsuarios, usuarios ,eliminarUsuario,editarUsuario} = usuarioContext;
    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;
    const authContext = useContext(AuthContext);
    const {usuario} = authContext;
    
    useEffect(() => {
        if(usuarios.length === 0){
            obtenerUsuarios();
        }
        //console.log(usuarios); // == system.out.println(usuarios)
    },[]);


    const actualizarFila = (newData, oldData, resolve, reject) => {
        //VALIDACION DE CARGO
        if(usuario && (usuario.cargo == 'jefeproduccion' || usuario.cargo == 'admin') ){
            editarUsuario(newData);
            setTimeout(() => {
                resolve()
            }, 3000);

        }else{
            mostrarAlerta('No tienes los permisos para realizar la accion', 'alerta-error');
            reject();
        }
        
    }
    const eliminarFila = async (oldData, resolve, reject) => {
        if(usuario && (usuario.cargo == 'jefeproduccion' || usuario.cargo == 'admin') ){
            eliminarUsuario(oldData);
            setTimeout(() => {
                resolve()
            }, 3000);
        }else{
            mostrarAlerta('No tienes los permisos para realizar la accion', 'alerta-error');
            reject();
        }
    }
    if(usuarios.length === 0){
        return null;
    }
    return ( 
        <Fragment>
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
            <h1>VER USUARIOS</h1>
            
                <div id="custom-font">
                    <TablaGestion
                        columns={columnasUsuarios}
                        data={usuarios}
                        handleRowUpdate={actualizarFila}
                        handleRowDelete={eliminarFila}
                    />
                </div>        
        </Fragment>
    );
}
 
export default VerUsuarios;