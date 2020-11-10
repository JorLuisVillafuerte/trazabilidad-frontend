import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UsuariosRoutes from '../../routes/UsuariosRoutes';
import MenuGestion from '../util/MenuGestion';

const GestionUsuarios = () => {
    return ( 
        <div className="seccion-principal">
            <MenuGestion routesMenu={UsuariosRoutes}/>
            <main>
                <div className="contenedor-tareas">
                    <Switch>
                    {UsuariosRoutes.map((prop, key) => {
                        return (
                            <Route
                                path={prop.path}
                                component={prop.component}
                                key={key}
                            />
                            );   
                        })}
                    </Switch>
                </div>
            </main>
        </div>
     );
}
 
export default GestionUsuarios;