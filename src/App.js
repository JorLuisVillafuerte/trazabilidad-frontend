import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Switch,Route, HashRouter} from 'react-router-dom';
import Login from './components/autenticacion/Login';
import Dashboard from './components/layout/Dashboard';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import PedidoState from './context/pedidos/pedidoState';
import ObservacionState from './context/observaciones/observacionState';
import UsuarioState from './context/usuarios/usuarioState';
import PrivateRoute from './config/PrivateRoute';
import ProductoState from './context/productos/productoState';

const App = () => {
    return (
        <PedidoState>
            <ObservacionState>
                <AuthState>
                    <UsuarioState>
                        <ProductoState>
                            <AlertaState>
                                <HashRouter>
                                    <Switch>
                                        <Route exact path="/" component={Login} />
                                        <PrivateRoute path="/dashboard" component={Dashboard} />
                                    </Switch>
                                </HashRouter>
                            </AlertaState>
                        </ProductoState>
                    </UsuarioState>
                </AuthState>
            </ObservacionState>
        </PedidoState>
    );
}

export default App;