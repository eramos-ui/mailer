/*
  Rutas de usuario / ToDoList
  host + /api/toDo
*/
const { Router } = require ('express');
const router =Router(); 

const { check } = require('express-validator'); 

const { validarJWT } =require( '../middlewares/validar-jwt');
const { enviaLinkCtrl } = require('../controllers/enviaLinkCtrl');

router.get('/enviaLink',
            //  [
            //     check('uid','La identificación del usuario es obligatoria').isNumeric(),
            //     validarCampos
            //  ],          
             //validarJWT, 
             enviaLinkCtrl ); //ojo con el orden


module.exports = router;