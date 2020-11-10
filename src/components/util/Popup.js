import React, { useState } from 'react';  
import { Dialog, DialogTitle, DialogContent , makeStyles, Typography} from '@material-ui/core';
import  Boton from './Boton';

//FUNCIONES EXTRAIDAS DE MATERIAL-UI

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        position: 'absolute',
        //width: 600,
        //backgroundColor: theme.palette.background.paper,
        //boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        //top: theme.spacing(5)
    },
}));

const Popup = (props) => {

    /* //CONFIGURACION DEL MODAL DE MATERIAL-UI
    function getModalStyle() {
        const top = 50 ;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const [modalStyle] = useState(getModalStyle);
    const [open,setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    */
    const classes = useStyles();
    const { title, children, openPopup, setOpenPopup, handleClose} = props;

    return ( 
        <Dialog open={openPopup} maxWidth="md" onClose={handleClose} classes={{paper: classes.dialogWrapper}}>
            <DialogTitle>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h4" component="div" style={{flexGrow:1, marginRight: 40}} >
                        {title} 
                    </Typography>
                    <Boton 
                        color="secondary"   
                        text="X" 
                        onClick={()=>{
                            setOpenPopup(false);
                        }}>
                    </Boton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
     );
}
 
export default Popup;