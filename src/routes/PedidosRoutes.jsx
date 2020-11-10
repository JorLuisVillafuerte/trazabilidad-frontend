import CargarPedidos from "../components/pedidos/CargarPedidos";
import EstadoPedidos from "../components/pedidos/EstadoPedidos";
import VerPedidos from "../components/pedidos/VerPedidos";

var PedidosRoutes = [
    {
      path: '/dashboard/pedidos/cargar',
      name: 'Cargar Pedidos',
      icon: 'mdi mdi-adjust',
      component: CargarPedidos
    },
    {
      path: '/dashboard/pedidos/ver',
      name: 'Ver Pedidos',
      icon: 'mdi mdi-adjust',
      component: VerPedidos
    },
    {
      path: '/dashboard/pedidos/cambiarestado',
      name: 'Estado Pedidos',
      icon: 'mdi mdi-adjust',
      component: EstadoPedidos
    },
]
export default PedidosRoutes;