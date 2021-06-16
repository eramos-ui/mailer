const { response } = require('express'); //para tener la intellisense
const { validationResult } = require('express-validator');

 const validarCampos =( req, res = response, next ) =>{ //next es call back para llamar al siguiente check si el presente está OK
    //console.log('validarCampos:',req);
    const errors =validationResult ( req ); 
    if ( !errors.isEmpty() ){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next(); //si todo está OK se ejecuta el siguiente check en el middleware
 } 

 module.exports ={
     validarCampos
 }