import clienteAxios from './axios';

//TOMA EL TOKEN Y LO COLOCA EN EL HEADER
const authToken = token => {
    if (token) {
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete clienteAxios.defaults.headers.common['x-auth-token']
    }
}
export default authToken;