import AgregarUsuario from '../components/usuarios/AgregarUsuario';
import VerUsuarios from '../components/usuarios/VerUsuarios';

var UsuariosRoutes = [
    {
      path: '/dashboard/usuarios/agregar',
      name: 'Agregar Usuario',
      icon: 'mdi mdi-adjust',
      component: AgregarUsuario
    },
    {
      path: '/dashboard/usuarios/ver',
      name: 'Ver Usuarios',
      icon: 'mdi mdi-adjust',
      component: VerUsuarios
    },
]
export default UsuariosRoutes;