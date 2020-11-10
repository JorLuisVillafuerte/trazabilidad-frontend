import React, { useContext } from 'react';
//import PedidoContext from '../../context/pedidos/pedidoContext';
//import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AuthContext from '../../context/autenticacion/authContext';
const Sidebar = (props) => {
    
    const authContext = useContext(AuthContext); 
    const {usuario} = authContext;

    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? 'selected' : '';
    }
    if(usuario === null){
        return null;
    }else{

    
    return (
        <aside>
            <h1>TRAZABILIDAD<span>v1.0</span></h1>
            <hr/>
            <div className="scroll-sidebar">
                <div className="proyectos">
                    <PerfectScrollbar className="sidebar-nav">
                        <Nav style={{display: 'block'}}>

                            {usuario.cargo == 'operario' || usuario.cargo == 'vendedor' ? (
                                <li className={activeRoute.bind('/dashboard/pedidos') + ('') + ' sidebar-item'}>
                                    <NavLink to={'/dashboard/pedidos'} className="sidebar-link" activeClassName="active">
                                        <button
                                            type="button"
                                            className="btn btn-primario btn-block btn-custom"  
                                            >
                                            <span className="hide-menu">{'Pedidos'}</span>
                                        </button>
                                    </NavLink>
                                </li>
                            ):(
                               props.MainRoutes.map((prop, key) => {

                                return (
                                    <li className={activeRoute.bind(prop.path) + (prop.pro ? ' active active-pro' : '') + ' sidebar-item'} key={key}>
                                        <NavLink to={prop.path} className="sidebar-link" activeClassName="active">
                                            <button
                                                type="button"
                                                className="btn btn-primario btn-block btn-custom"  
                                                >
                                                <span className="hide-menu">{prop.nombre}</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                );
                                })
                            )
                            }

                            
                            
                        </Nav>
                    </PerfectScrollbar>
                </div>
            </div>
        </aside>
    );
    }
}
export default Sidebar;