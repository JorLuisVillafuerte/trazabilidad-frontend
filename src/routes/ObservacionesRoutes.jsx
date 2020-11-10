import AgregarObservacion from "../components/observaciones/AgregarObservacion";
import VerObservaciones from "../components/observaciones/VerObservaciones";

var ObservacionesRoutes = [
    {
      path: '/dashboard/observaciones/agregar',
      name: 'Agregar Observacion',
      icon: 'mdi mdi-adjust',
      component: AgregarObservacion
    },
    {
      path: '/dashboard/observaciones/ver',
      name: 'Ver Observaciones',
      icon: 'mdi mdi-adjust',
      component: VerObservaciones
    },
]
export default ObservacionesRoutes;