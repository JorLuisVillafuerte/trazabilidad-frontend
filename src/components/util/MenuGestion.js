import React from 'react';
import { Nav } from 'reactstrap';  
import {Card,CardText,CardTitle,Button,Row,Col, CardBody} from 'reactstrap';
import { Route, Switch, Link, NavLink } from 'react-router-dom';

const MenuAction = (props) => {
    return ( 
        <div className="formulario">
            <Row style={{display: 'flex', justifyContent: 'center'}}>
                {props.routesMenu.map((prop, key) => {
                    return (
                    <Col md={3} key={key}>
                        <Link to={prop.path}>
                            <Button
                            type="button" 
                            block
                            className="btn btn-primario btn-submit"
                            name="cargar"
                            >
                        {prop.name}
                            </Button>
                        </Link>
                    </Col>
                );                
                })}
                </Row>
        </div>
    );
}
 
export default MenuAction;