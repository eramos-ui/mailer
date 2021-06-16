
const leeUsuarioByEmail = require('./leeUsuarioByEmail');


const leeUsuario = async ( email  ) =>{ //para auth
    const usuario = await leeUsuarioByEmail (email)
    if (!usuario ) { //no existe
        return; 
    }
    const { IdUsuario:uid ,name , Email, UserName , Clave} =usuario;
    //console.log('leeUsuario:',uid ,name , Email, UserName , Clave)
    return  {
        uid,
        userName: UserName, 
        name,
        email: Email,
        clave: Clave
    
    };
}
module.exports = leeUsuario;