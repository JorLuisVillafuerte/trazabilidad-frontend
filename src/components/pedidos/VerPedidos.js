import React, { useContext, Fragment, useEffect, useState } from 'react';
import PedidoContext from '../../context/pedidos/pedidoContext'
import AlertaContext from '../../context/alertas/alertaContext'
import TablaGestion from '../tablas/TablaGestion';
import {columnasPedidos} from '../util/Columnas';
import AuthContext from '../../context/autenticacion/authContext';
import { Dialog, DialogContent} from '@material-ui/core';
import { Table } from 'reactstrap';

const VerPedidos = () => {

    const pedidoContext = useContext(PedidoContext); 
    const {pedidos,obtenerPedidos, editarPedido, eliminarPedido} = pedidoContext;
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
    const authContext = useContext(AuthContext);
    const {usuario} = authContext;
    
    useEffect(() => {
        async function obtener(){
            const rest = await obtenerPedidos();
        }
        if(pedidos.length === 0){
            obtener();
        }
    }, []);

    const actualizarFila = async(newData, oldData, resolve, reject) => {
        if(usuario && (usuario.cargo === 'jefeproduccion' || usuario.cargo === 'admin') ){
            var flag = await editarPedido(newData);
            if(flag === true){
                setTimeout(() => {
                    resolve()
                }, 5000);
            }else{
                mostrarAlerta('Ocurrio un error al editar el registro', 'alerta-error');
                reject();
            }

        }else{
            mostrarAlerta('No tienes los permisos para realizar la accion', 'alerta-error');
            reject();
            
        }
        
    }
    const eliminarFila = async(oldData, resolve, reject) => {
        if(usuario && (usuario.cargo === 'jefeproduccion' || usuario.cargo === 'admin') ){
            var flag = await eliminarPedido(oldData);
            if(flag===true){
                setTimeout(() => {
                    resolve()
                }, 5000);

            }else{
                mostrarAlerta('Ocurrio un error al eliminar el registro', 'alerta-error');
                reject();
            }

        }else{
            mostrarAlerta('No tienes los permisos para realizar la accion', 'alerta-error');
            reject();
        }
    }
    const [openPopup, setOpenPopup] = useState(false);
    const [pedido, setPedido] = useState(null);
    const cerrarPopup = () => {setOpenPopup(false);};
    const mostrarDescripcion = (event,rowData) =>{
        setPedido(rowData);
        console.log(rowData);
        setOpenPopup(true);

    }
    if(pedidos.length === 0){return null;}
    return ( 
        <Fragment>
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
            <h1>VER PEDIDOS</h1>
                <div >
                    <TablaGestion
                        columns={columnasPedidos}
                        data={pedidos}
                        handleRowUpdate={actualizarFila}
                        handleRowDelete={eliminarFila}
                        type={'verpedidos'}
                        handleDetails={mostrarDescripcion}
                        />
                </div>
                <Dialog fullWidth={true} maxWidth={'sm'} open={openPopup} onClose={cerrarPopup} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <div>
                            {pedido === null ? (null): (
                                <Table>
                                <thead>
                                  <tr>
                                    <th>#Id</th>
                                    <th>Producto</th>
                                    <th>Descripcion</th>
                                    <th>Unidades</th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {pedido.pedidoDetalleList.map((detalle, key) => {
                                        return(
                                            <tr key={key}>
                                                <th scope="row">{detalle.idpedidoDetalle}</th>
                                                <td>{detalle.idproducto.codProducto}</td>
                                                <td>{detalle.idproducto.descripcion}</td>
                                                <td>{detalle.unidades}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                              </Table>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>        
        </Fragment>
     );
}
 
export default VerPedidos;