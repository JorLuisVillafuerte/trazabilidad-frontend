import React from 'react';
import MenuGestion from '../util/MenuGestion';
import stockRoutes from '../../routes/StockRoutes';
import { Route, Switch } from 'react-router-dom';

const GestionStock = () => {
    return ( 
        <div>
            <div className="seccion-principal">
            <MenuGestion routesMenu={stockRoutes}/>
            <main>
                <div className="contenedor-tareas">
                    <Switch>
                    {stockRoutes.map((prop, key) => {
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
        </div>
     );
}
 
export default GestionStock;