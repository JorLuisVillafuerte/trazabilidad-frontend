import React, { useContext, useEffect, useState } from 'react';
import CanvasJSReact from '../../canvasjs.react';
import PedidoContext from '../../context/pedidos/pedidoContext';
import ObservacionesContext from '../../context/observaciones/observacionContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { Button, Card, CardBody, CardTitle, Col, Form, Row } from 'reactstrap';
import { Divider, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

const GestionEstadistica = () => {
    
    const alertaContext = useContext(AlertaContext);
    const {mostrarAlerta,alerta} = alertaContext;
    const pedidoContext = useContext(PedidoContext);
    const {obtenerPedidos, pedidos} = pedidoContext;
    const observacionesContext = useContext(ObservacionesContext);
    const {obtenerObservaciones, observaciones} = observacionesContext;
    useEffect(() => {
        if(pedidos.length === 0){
            obtenerPedidos()
        }
        if(observaciones.length === 0){
            obtenerObservaciones()
        }
    }, []);
    let galpon1 = pedidos.filter(ped=> ped.galpon === 1);
    let galpon2 = pedidos.filter(ped=> ped.galpon === 2);
    let galpon3 = pedidos.filter(ped=> ped.galpon === 3);
    let galpon4 = pedidos.filter(ped=> ped.galpon === 4);

    let unidadesGeneradas = 0;
    let unidadesObservacion = 0;
    let arrayEstadistica = [];
    if(galpon1.length > 0 ){
        galpon1.forEach(ped => {
            if(ped.pedidoDetalleList.length > 0){
                ped.pedidoDetalleList.forEach(detalle=> {
                    unidadesGeneradas = unidadesGeneradas+detalle.cantidad;
                })
            }
            observaciones.forEach(obs => {
            
                if(ped.idpedido === obs.idpedido.idpedido){
                    unidadesObservacion = unidadesObservacion + obs.cantidadPiezas;
                }
            });
        });
        //let porcentaje = (Number((unidadesObservacion / unidadesGeneradas)*100)-100)*-1;
        let porcentaje = ((unidadesGeneradas - unidadesObservacion) / unidadesGeneradas)*100;
        arrayEstadistica.push({
            label: 'Galpon 1',
            y: Number(porcentaje.toFixed(0))
        })
    }
    if(galpon2.length > 0 ){
        unidadesGeneradas = 0
        unidadesObservacion = 0
        galpon2.forEach(ped => {
            if(ped.pedidoDetalleList.length > 0){
                ped.pedidoDetalleList.forEach(detalle=> {
                    unidadesGeneradas = unidadesGeneradas+detalle.cantidad;
                })
            }
            observaciones.forEach(obs => {
                
                if(ped.idpedido === obs.idpedido.idpedido){
                    unidadesObservacion = unidadesObservacion + obs.cantidadPiezas;
                }
            });
        });
        //let porcentaje = (Number((unidadesObservacion / unidadesGeneradas)*100)-100)*-1;
        let porcentaje = ((unidadesGeneradas - unidadesObservacion) / unidadesGeneradas)*100;
        arrayEstadistica.push({
            label: 'Galpon 2',
            y: Number(porcentaje.toFixed(0))
        })
    }
    if(galpon3.length > 0 ){
        unidadesGeneradas = 0;
        unidadesObservacion = 0;
        galpon3.forEach(ped => {
            if(ped.pedidoDetalleList.length > 0){
                ped.pedidoDetalleList.forEach(detalle=> {
                    console.log(detalle);
                    unidadesGeneradas = unidadesGeneradas+detalle.cantidad;
                })
            }
            observaciones.forEach(obs => {
                if(ped.idpedido === obs.idpedido.idpedido){
                    unidadesObservacion = unidadesObservacion + obs.cantidadPiezas;
                }
            });
        });
        console.log(unidadesObservacion);
        console.log(unidadesGeneradas);
        //let porcentaje = (Number((unidadesObservacion / unidadesGeneradas)*100)-100)*-1;
        let porcentaje = ((unidadesGeneradas - unidadesObservacion) / unidadesGeneradas)*100; 

        console.log(porcentaje);
        arrayEstadistica.push({
            label: 'Galpon 3',
            y: Number(porcentaje.toFixed(0))
        })
    }
    if(galpon4.length > 0 ){
        unidadesGeneradas = 0
        unidadesObservacion = 0
        galpon4.forEach(ped => {
            if(ped.pedidoDetalleList.length > 0){
                ped.pedidoDetalleList.forEach(detalle=> {
                    unidadesGeneradas = unidadesGeneradas+detalle.cantidad;
                })
            }
            observaciones.forEach(obs => {
                if(ped.idpedido === obs.idpedido.idpedido){
                    unidadesObservacion = unidadesObservacion + obs.cantidadPiezas;
                }
            });
        });
        //let porcentaje = (Number((unidadesObservacion / unidadesGeneradas)*100)-100)*-1;
        let porcentaje = ((unidadesGeneradas - unidadesObservacion) / unidadesGeneradas)*100;
        arrayEstadistica.push({
            label: 'Galpon 4',
            y: Number(porcentaje.toFixed(0))
        })
    }
    const options = {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Eficiencia Galpones"
        },
        axisY: {
            //title: "Number of Downloads",
            //labelFormatter: this.addSymbols,
            
        },
        axisX: {
            title: "Galpones",
            labelAngle: 0
        },
        data: [{
            type: "column",
            dataPoints: arrayEstadistica
        }]
    }
    let [productoEficiencia, setProductoEficiencia] = useState({
        codProducto: '',
        galpon: ''
    });
    
    const onchange = (e) => {
        setProductoEficiencia({
            ...productoEficiencia,
            [e.target.name]: e.target.value
        });
    };
    const [optionsPrd, setoptionsPrd] = useState(null);
    let arrayEficienciaPrd = [];
    const onsubmit = async(e) => {
        e.preventDefault();
        let unidadesGeneradasProducto = 0;
        let unidadesObservacionProducto = 0;
        switch (productoEficiencia.galpon) {
            case 1:
                galpon1.forEach(ped => {
                    ped.pedidoDetalleList.forEach( detalle => {
                        if(detalle.idproducto.codProducto === productoEficiencia.codProducto){
                            unidadesGeneradasProducto = unidadesGeneradasProducto + detalle.cantidad;
                        }
                    });
                });
                observaciones.forEach(obs => {
                    if(obs.idproducto.codProducto === productoEficiencia.codProducto && obs.idpedido.galpon === 1){
                        unidadesObservacionProducto = unidadesObservacionProducto + obs.cantidadPiezas;
                    }
                })
              
                break;
        
            case 2:
                galpon2.forEach(ped => {
                    ped.pedidoDetalleList.forEach( detalle => {
                        if(detalle.idproducto.codProducto === productoEficiencia.codProducto){
                            unidadesGeneradasProducto = unidadesGeneradasProducto + detalle.cantidad;
                        }
                    });
                });
                observaciones.forEach(obs => {
                    if(obs.idproducto.codProducto === productoEficiencia.codProducto && obs.idpedido.galpon === 2){
                        console.log('no deberia mostrarse');
                        unidadesObservacionProducto = unidadesObservacionProducto + obs.cantidadPiezas;
                    }
                })
                
                break;
            case 3:
                galpon3.forEach(ped => {
                    ped.pedidoDetalleList.forEach( detalle => {
                        if(detalle.idproducto.codProducto === productoEficiencia.codProducto){
                            unidadesGeneradasProducto = unidadesGeneradasProducto + detalle.cantidad;
                        }
                    });
                });
                observaciones.forEach(obs => {
                    if(obs.idproducto.codProducto === productoEficiencia.codProducto && obs.idpedido.galpon === 3){
                        unidadesObservacionProducto = unidadesObservacionProducto + obs.cantidadPiezas;
                    }
                })
                
                break;
            case 4:
                galpon4.forEach(ped => {
                    ped.pedidoDetalleList.forEach( detalle => {
                        if(detalle.idproducto.codProducto === productoEficiencia.codProducto){
                            unidadesGeneradasProducto = unidadesGeneradasProducto + detalle.cantidad;
                        }
                    });
                });
                observaciones.forEach(obs => {
                    if(obs.idproducto.codProducto === productoEficiencia.codProducto && obs.idpedido.galpon === 4){
                        unidadesObservacionProducto = unidadesObservacionProducto + obs.cantidadPiezas;
                    }
                })    
                break;
            default:
                break;
        }

        console.log(unidadesGeneradasProducto)
        console.log(unidadesObservacionProducto)
        if(unidadesGeneradasProducto == 0){
            console.log('aasda')
            mostrarAlerta('No se encontro un producto con ese codigo o con el galpon seleccionado', 'alerta-error');
            await setoptionsPrd(null);
            return;
        }
        if(unidadesObservacionProducto == 0){
            console.log('aasdsssa')
            mostrarAlerta('No hay observaciones del producto', 'alerta-ok');
            await setoptionsPrd(null);
            return;
        }

        arrayEficienciaPrd.push({
            y: unidadesGeneradasProducto,
            label: 'Cantidad Generadas'
        });
        arrayEficienciaPrd.push({
            y: unidadesObservacionProducto,
            label: 'Cantidad Observadas'
        });
        console.log(arrayEficienciaPrd);
        //var eficienciaproducto = ((Number((unidadesObservacionProducto / unidadesGeneradasProducto)*100)-100)*-1);
        var eficienciaproducto = (((unidadesGeneradas - unidadesObservacion) / unidadesGeneradas)*100).toFixed(2);
        await setoptionsPrd({
            exportEnabled: true,
            animationEnabled: true,
            title:{
				text: `Eficiencia del producto: ${eficienciaproducto}%`
			},
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: arrayEficienciaPrd
            }]
        })
    }

    return ( 
        <div className="seccion-principal">
            <main>
                {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
                <div className="contenedor-tareas">
                    {(arrayEstadistica.length === 0) ? (null): (
                        <CanvasJSReact.CanvasJSChart options = {options} 
                        />
                    )}
                    <Card className="mt-4">
                        <CardBody>
                            <CardTitle className="text-center mb-4 mt-2" tag="h3">Eficiencia por producto</CardTitle>
                            <Divider className="my-4" />
                            <Form onSubmit={onsubmit}>
                                <Row form >
                                    <Col md={4}>
                                        <FormGroup>
                                            <TextField
                                                label="Ingresar producto"
                                                fullWidth
                                                required
                                                name="codProducto"
                                                onChange={onchange}
                                                value={productoEficiencia.codProducto}
                                                
                                            />
                                        </FormGroup> 
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <FormControl fullWidth >
                                                <InputLabel id="galpon1">Galpon</InputLabel>
                                                <Select
                                                    labelId="galpon1"
                                                    id="galpon"
                                                    name="galpon"
                                                    label="Galpon"
                                                    fullWidth
                                                    required
                                                    onChange={onchange}
                                                    value={productoEficiencia.galpon}
                                                >
                                                    <MenuItem value="">
                                                        <em>Seleccione un Galpon</em>
                                                    </MenuItem>
                                                    <MenuItem value={1}>Galpon 1</MenuItem>
                                                    <MenuItem value={2}>Galpon 2</MenuItem>
                                                    <MenuItem value={3}>Galpon 3</MenuItem>
                                                    <MenuItem value={4}>Galpon 4</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <Button className="mt-8" color="info" block type="submit" >Buscar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                    {(optionsPrd === null)? (null):(
                        <CanvasJSReact.CanvasJSChart options = {optionsPrd}
                        />
                    )}

                </div>
            </main>
        </div>
    );
}
 
export default GestionEstadistica;