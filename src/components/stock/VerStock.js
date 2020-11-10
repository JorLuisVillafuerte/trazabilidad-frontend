import React, { Fragment, useContext, useEffect } from 'react';
import AlertaContext from '../../context/alertas/alertaContext';
import ProductoContext from '../../context/productos/productoContext';
import TablaGestion from '../tablas/TablaGestion';
import { columnasProductos } from '../util/Columnas';
const VerStock = () => {
    
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
    const productoContext = useContext(ProductoContext);
    const {productos, obtenerProductos, editarProducto} = productoContext;

    useEffect(() => {
        if(productos.length === 0){
            obtenerProductos();
        }
    }, []);

    const actualizarFila = (newData, oldData, resolve, reject) => {
        
        if(newData.cantidad < 0 ){
            mostrarAlerta('La cantidad no puede ser menor a cero', 'alerta-error');
            reject();
        }else{
            editarProducto(newData);
            setTimeout(() => {
                resolve()
            }, 3000);
            
        }
    }
    if(productos.length === 0){
        return null;
    }
    return ( 
        <Fragment>
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
            <h1>VER STOCK</h1>
                <div id="custom-font">
                    <TablaGestion
                        columns={columnasProductos}
                        data={productos}
                        type={'stock'}
                        handleRowUpdate={actualizarFila}
                    />
                </div>
        </Fragment>
     );
}
 
export default VerStock;