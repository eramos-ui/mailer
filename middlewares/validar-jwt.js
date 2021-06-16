const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req , res = response, next ) =>{
   //console.log('validarJWT', req.header('x-token') );
   const token= req.header('x-token'); //viene en el header como x-token
   console.log('token:',token,  !token ); 
   if ( !token ) {
       return res.status(402).json({
           ok:false,
           msg: 'No hay token en la petición'
       });
   }
   try {
        const { uid , name } = jwt.verify (
            token,
            process.env.SECRET_JWT_SEED
        );
       
        req.uid=uid;   //modificamos el req para siguiente req
        req.name=name;
        
   } catch(error){
       console.log(error);
       return res.status(401).json ({
        ok:false,
        msg: 'Token inválido'           
       })
   }
   //console.log('jwt-next:',req.header('x-token'), req.uid, req.name );
   next();
}

module.exports = {
    validarJWT
}