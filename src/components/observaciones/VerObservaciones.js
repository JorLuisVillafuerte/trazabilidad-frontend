import React, { Fragment, useContext, useEffect } from 'react';
import AlertaContext from '../../context/alertas/alertaContext';
import { columnasObservaciones } from '../util/Columnas';
import ObservacionContext from '../../context/observaciones/observacionContext';
import TablaGestion from '../tablas/TablaGestion';

const VerObservaciones = () => {

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const observacionContext = useContext(ObservacionContext);
    const { observaciones, obtenerObservaciones, editarObservacion, eliminarObservacion} = observacionContext;

    useEffect(() => {
        obtenerObservaciones();
    },[]);


    const handleRowUpdate = (newData, oldData, resolve, reject) => {
        console.log(newData);
        const cantidadPiezasMax = oldData.idpedido.pedidoDetalleList.filter(ped => ped.idproducto.codProducto == newData.idproducto.codProducto);
        console.log(cantidadPiezasMax[0]);
        if(newData.cantidadPiezas < 0){
            mostrarAlerta('La cantidad de piezas a registrar debe ser mayor a cero','alerta-error');
            reject();
        }else if(cantidadPiezasMax.length > 0 && cantidadPiezasMax[0].cantidad < newData.cantidadPiezas){
            mostrarAlerta('La cantidad de piezas es mayor a la del pedido: '+cantidadPiezasMax[0].cantidad, 'alerta-error');
            reject();
        }else{
            console.log('aaa')
            editarObservacion(newData);
            setTimeout(() => {
                resolve()
            }, 3000);
            resolve()
        }
        
    }
    const handleRowDelete = async (oldData, resolve, reject) => {
        eliminarObservacion(oldData);
        setTimeout(() => {
            resolve()
        }, 3000);
    }
    if(observaciones.length === 0){
        return null;
    }
    return ( 
        <Fragment>
        {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
        <h1>VER OBSERVACIONES</h1>
        <div id="custom-font">
            <TablaGestion
                columns={columnasObservaciones}
                data={observaciones}
                handleRowUpdate={handleRowUpdate}
                handleRowDelete={handleRowDelete}
                />
        </div>  
        </Fragment>
     );
}
 
export default VerObservaciones;