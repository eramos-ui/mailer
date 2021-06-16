/*
  Rutas de usuario / ToDoList
  host + /api/toDo
*/
const { Router } = require ('express');
const router =Router(); 

const { check } = require('express-validator'); 

// const { crearUsuario, loginUsuario, revalidarToken, sendEmail } = require('../controllers/auth');
//const { validarCampos } =require('../middlewares/validar-campos');
const { validarJWT } =require( '../middlewares/validar-jwt');
const { menuCtrl } = require('../controllers/menuCtrl');

router.get('/toDoList',
            //  [
            //     check('uid','La identificación del usuario es obligatoria').isNumeric(),
            //     validarCampos
            //  ],          
             validarJWT, menuCtrl ); //ojo con el orden


module.exports = router;