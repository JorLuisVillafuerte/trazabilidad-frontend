import React, { useContext} from 'react';
import { Route, Switch } from 'react-router-dom';
import ObservacionContext from '../../context/observaciones/observacionContext';
import ObservacionesRoutes from '../../routes/ObservacionesRoutes';
import MenuGestion from '../util/MenuGestion';

const GestionObservaciones = () => {

    const observacionContext = useContext(ObservacionContext); 
    const {  } = observacionContext;


    return ( 
        <div className="seccion-principal">
            <MenuGestion routesMenu={ObservacionesRoutes}/>
            <main>
                <div className="contenedor-tareas">
                    <Switch>
                    {ObservacionesRoutes.map((prop, key) => {
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
 
export default GestionObservaciones;