/*
  Rutas de usuario / Auth
  host + /api/auth
*/
const { Router } = require ('express');
const router =Router(); 

const { check } = require('express-validator'); 

const { crearUsuarioCtrl, loginUsuario, revalidarToken, sendEmails, cargaOrganizaciones, eliminarOrganizacion
      , insertarNewOrganizacion, actualizarOrganizacion, leeUsuariosCtrl
    , eliminarUsuarioCtrl, actualizarUsuarioCtrl, insertarUsuarioCtrl, leeOrganizacionUsuarioCtrl
  , leeEquiposOrganizacionCtrl,insertarGrupoCtrl,eliminarGrupoCtrl ,actualizarGrupoCtrl
 , leeParticipesGrupoCtrl ,insertarParticipeAGrupoCtrl, eliminarParticipeDeGrupoCtrl
 , autocompleteParticipesCtrl ,actualizarParticipeGrupoCtrl, crearReunionCtrl ,leeusrxemailCtrl } = require('../controllers/auth');

const { validarCampos } =require('../middlewares/validar-campos');
const { validarJWT } =require( '../middlewares/validar-jwt');

router.post('/new', //los path aquí son adicionales a la ruta
            [//middlewares (pueden)
              check('nombre','El nombre es obligatorio').not().isEmpty(),
              check('email','El email es obligatorio').isEmail(),             
              check('password','La password debe de ser de más de 6 caracteres').isLength({ min:6 }),
              validarCampos 
            ],
            crearUsuarioCtrl ); // la función controller
router.post('/',
            [
              check('email','El email es obligatorio').isEmail(),  
              check('password','La password debe de ser de más de 6 caracteres').isLength({ min:6 }),
             validarCampos
            ],          
             loginUsuario ); 
router.post('/send-email', 
            sendEmails );
router.get('/org',
            cargaOrganizaciones );
router.post('/neworg', //los path aquí son adicionales a la ruta
              [//middlewares (pueden)
                check('organizacion','El nombre de la organización es obligatorio').not().isEmpty(),
                check('rut','El rut es obligatorio').not().isEmpty(),
                validarCampos 
              ],
              insertarNewOrganizacion ); // la función controller
router.post('/actorg', //los path aquí son adicionales a la ruta
              [//middlewares (pueden)
                check('organizacion','El nombre de la organización es obligatorio').not().isEmpty(),
                check('rut','El rut es obligatorio').not().isEmpty(),
                validarCampos 
              ],
              actualizarOrganizacion ); // la función controller
router.post('/eliorg', //los path aquí son adicionales a la ruta
              [//middlewares (pueden)
                check('organizacion','El nombre de la organización es obligatorio').not().isEmpty(),
                check('rut','El rut es obligatorio').not().isEmpty(),
                validarCampos 
              ],
              eliminarOrganizacion ); // la función controller
router.get('/renew', validarJWT, revalidarToken );
router.get('/usuarios',
          leeUsuariosCtrl );
router.post('/orguser', validarJWT ,leeOrganizacionUsuarioCtrl );          
router.post('/eliusr',
         [
           check('email','El email es obligatorio').isEmail(), 
           validarCampos  
         ],
         eliminarUsuarioCtrl);
router.post('/actusr',
         [
           check('email','El email es obligatorio').isEmail(), 
           validarCampos  
         ],
         actualizarUsuarioCtrl);         
router.post('/newusr',
         [
           check('email','El email es obligatorio').isEmail(), 
           validarCampos  
         ],
         insertarUsuarioCtrl);             
router.post('/orgequipo', validarJWT ,leeEquiposOrganizacionCtrl );           
router.post('/newgrupo',
         [
           check('nombreEquipo','El nombre del equipo es obligatorio').not().isEmpty(), 
           check('emailAdministrador','El email del administrador es obligatorio').isEmail(), 
           validarCampos  
         ],
         insertarGrupoCtrl); 
router.post('/eligrupo',
         [
           check('idEquipo','El id del equipo es obligatorio').not().isEmpty(), 
           validarCampos  
         ],
         eliminarGrupoCtrl);         
router.post('/actgrupo',
         [
          check('idEquipo','El id del equipo es obligatorio').not().isEmpty(),
           validarCampos  
         ],
         actualizarGrupoCtrl);         
router.post('/equipousr', validarJWT ,leeParticipesGrupoCtrl );  
router.post('/newmembergroup',
         [
           check('nombre','El nombre es obligatorio').not().isEmpty(), 
           check('email','El email es obligatorio').isEmail(), 
           check('idEquipo','El id del equipo es obligatorio').not().isEmpty(), 
           validarCampos  
         ],
         insertarParticipeAGrupoCtrl); 
router.post('/elimembergroup',
         [
           check('idEquipo','El id del equipo es obligatorio').not().isEmpty(), 
           check('idUsuario','El id del usuario es obligatorio').not().isEmpty(), 
           validarCampos  
         ],
         eliminarParticipeDeGrupoCtrl); 
router.post('/leemembersautocomplete', validarJWT ,autocompleteParticipesCtrl );           
router.post('/actmembergroup',
         [
          check('idEquipo','El id del equipo es obligatorio').not().isEmpty(),
          check('idUsuario','El id del usuario es obligatorio').not().isEmpty(),
           validarCampos  
         ],
         actualizarParticipeGrupoCtrl); 
router.post('/creareunion',
         [
          check('idEquipo','El id del equipo es obligatorio').not().isEmpty(),
           validarCampos  
         ],
         crearReunionCtrl); 
router.post('/leeusrxemail', validarJWT ,leeusrxemailCtrl);          
module.exports = router;