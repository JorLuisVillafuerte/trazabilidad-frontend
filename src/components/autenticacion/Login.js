import React, { useState, useContext, useEffect } from 'react';
import Logo from '../../img/logo.jpg';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    //EXTRAER CONTEXT
    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext); 
    const { iniciarSesion, msg, autenticado } = authContext; 
 
    //STATE INICIO SESION
    const [usuario, setUsuario] = useState({
        dni: '',
        password: ''
    });
    const {dni,password} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }
    //SE EJECUTA AL INICIAR SESION (BOTON)
    const onSubmit = (e) => {
        e.preventDefault();
        
         //VALIDAR
        if(dni.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        if(dni.length !== 8){
            mostrarAlerta('El dni debe contener 8 caracteres', 'alerta-error');
            return;
        }
        //ACTION 
        iniciarSesion(usuario); 
      
    }
    
    useEffect(() => {
        //console.log('ENTRA USE EFECT');
        //SI EL LOGIN ES CORRECTO ENTONCES AUTENTICADO = TRUE Y ENVIA AL USER AL DASHBOARD
        if(autenticado){
            props.history.push('/dashboard');
        } 
        //SI EL LOGIN ES FALLIDO SE GUARDA UN MENSAJE EN "MSG" Y LUEGO MUESTRA ESE MENSAJE
        if(msg){
            mostrarAlerta(msg.msg,msg.categoria);
        }
    }, [msg, autenticado, props.history]); 

    return (
        // INICIO INTERFAZ LOGIN
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <img src={Logo} alt="" width="100%"/>
                <h1>Trazabilidad</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="dni">Dni</label>
                        <input 
                            type="number" 
                            name="dni" 
                            id="dni"
                            placeholder="Ingresa tu dni"
                            value={dni}
                            onChange={onChange}
                            />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Ingresa tu password"
                            value={password}
                            onChange={onChange}
                            />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            value="Iniciar Sesion"
                            className="btn btn-primario btn-block"
                        />
                    </div>
                </form>
            </div>
        </div>
     );
    // FIN INTERFAZ LOGIN
}
 
export default Login;