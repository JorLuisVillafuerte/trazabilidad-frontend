import GestionPedidos from '../components/pedidos/GestionPedidos';
import GestionObservaciones from '../components/observaciones/GestionObservaciones';
import GestionUsuarios from '../components/usuarios/GestionUsuarios';
import GestionEstadistica from '../components/estadistica/GestionEstadistica';
import GestionStock from '../components/stock/GestionStock';


var MainRoutes = [
    {
      path: '/dashboard/pedidos',
      nombre: 'Pedidos',
      component: GestionPedidos
    },
    {
      path: '/dashboard/observaciones',
      nombre: 'Observaciones',
      component: GestionObservaciones
    },
    {
      path: '/dashboard/usuarios',
      nombre: 'Usuarios',
      component: GestionUsuarios
    },
    {
      path: '/dashboard/estadistica',
      nombre: 'Estadistica',
      component: GestionEstadistica
    },
    {
      path: '/dashboard/stock',
      nombre: 'Stock',
      component: GestionStock
    },
]
export default MainRoutes;