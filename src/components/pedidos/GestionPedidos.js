import React, { useContext} from 'react';
import MenuGestion from '../util/MenuGestion';
import PedidosRoutes from '../../routes/PedidosRoutes';
import { Route, Switch } from 'react-router-dom';

const GestionPedidos = () => {
    
    return ( 
        <div className="seccion-principal">
            <MenuGestion routesMenu={PedidosRoutes}/>
            <main>
                <div className="contenedor-tareas">
                    <Switch>
                    {PedidosRoutes.map((prop, key) => {
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
 
export default GestionPedidos;