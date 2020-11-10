import { Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import React from 'react';
const TablaGestion = (props) => {
    //console.log('Datos que recibe la tabla: '+ JSON.stringify(props.data));
    if(props.type === 'stock'){
      return (
        <MaterialTable
          title={''}
          columns={props.columns}
          data={props.data}
          localization={{          
            body: {
                emptyDataSourceMessage: 'No hay registros para mostrar en la tabla',
                editRow:{
                  deleteText: '¿Estas seguro de eliminar el registro seleccionado?'
                },
                deleteTooltip: 'Eliminar',
                editTooltip: 'Editar',
                addTooltip: 'Agregar'
            },
            header: {
              actions: 'Opciones'
            },
            toolbar: {
              searchPlaceholder: 'Buscar'
            }
          }}
          options={{
            pageSize: 10,
            headerStyle: {
              fontSize: 16,
            },
            searchFieldStyle: {
              fontSize: 16,
            }
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve,reject) => {
              props.handleRowUpdate(newData, oldData, resolve,reject);
            })
          }}
          
        />
      );
    }else if(props.type === 'verpedidos'){
      return (
        <MaterialTable
          title={''}
          columns={props.columns}
          data={props.data}
          localization={{          
            body: {
                emptyDataSourceMessage: 'No hay registros para mostrar en la tabla',
                editRow:{
                  deleteText: '¿Estas seguro de eliminar el registro seleccionado?'
                },
                deleteTooltip: 'Eliminar',
                editTooltip: 'Editar',
                addTooltip: 'Agregar'
            },
            header: {
              actions: 'Opciones'
            },
            toolbar: {
              searchPlaceholder: 'Buscar'
            }
          }}
          options={{
            pageSize: 10,
            headerStyle: {
              fontSize: 16,
            },
            searchFieldStyle: {
              fontSize: 16,
            }
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve,reject) => {
              props.handleRowUpdate(newData, oldData, resolve,reject);
            }),
            onRowDelete : (oldData) => 
            new Promise ((resolve,reject) => { 
              props.handleRowDelete(oldData, resolve,reject)
            }) 
          }}
          actions={[
            {
              icon: 'search',
              tooltip: 'Ver descripcion',
              onClick: (event, rowData) => {
                props.handleDetails(event,rowData);
              }
            }
          ]}
          
        />
      );

    }else if(props.type=== 'estadoPedido'){
      return (
        <MaterialTable
          title={''}
          columns={props.columns}
          data={props.data}
          localization={{          
            body: {
                emptyDataSourceMessage: 'No hay registros para mostrar en la tabla',
                editRow:{
                  deleteText: '¿Estas seguro de eliminar el registro seleccionado?'
                },
                deleteTooltip: 'Eliminar',
                editTooltip: 'Editar',
                addTooltip: 'Agregar',
            },
            header: {
              actions: 'Opciones'
            },
            toolbar: {
              searchPlaceholder: 'Buscar'
            }
          }}
          options={{
            pageSize: 10,
            actionsColumnIndex: -1,
            headerStyle: {
              fontSize: 16,
            },
            searchFieldStyle: {
              fontSize: 16,
            }
          }}
          actions={[
            {
              icon: 'Cambiar Estado',
              tooltip: 'Save User',
              onClick: (event,rowData) => props.activarCambiarEstado(rowData)
            }
          ]}
          components={{
            Action: props => (
              <Button
                onClick={(event) => props.action.onClick(event, props.data)}
                color="default"
                variant="contained"
                style={{textTransform: 'none', fontSize: 14, minWidth:150}}
                size="medium"
              >
                Cambiar Estado
              </Button>
              
            ),
          }}
        />
      );
    }else{
      return (
        <MaterialTable
          title={''}
          columns={props.columns}
          data={props.data}
          localization={{          
            body: {
                emptyDataSourceMessage: 'No hay registros para mostrar en la tabla',
                editRow:{
                  deleteText: '¿Estas seguro de eliminar el registro seleccionado?'
                },
                deleteTooltip: 'Eliminar',
                editTooltip: 'Editar',
                addTooltip: 'Agregar'
            },
            header: {
              actions: 'Opciones'
            },
            toolbar: {
              searchPlaceholder: 'Buscar'
            }
          }}
          options={{
            pageSize: 10,
            headerStyle: {
              fontSize: 16,
            },
            searchFieldStyle: {
              fontSize: 16,
            }
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve,reject) => {
              props.handleRowUpdate(newData, oldData, resolve,reject);
            }),
            onRowDelete : (oldData) => 
            new Promise ((resolve,reject) => { 
              props.handleRowDelete(oldData, resolve,reject)
            }) 
          }}
         
          
        />
      );
    }
}
 
export default TablaGestion;