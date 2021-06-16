const { response } = require('express'); //para tener la intellisense
const bcrypt = require('bcryptjs'); //para encriptar contraseña del usuario
const { generarJWT } = require('../helpers/jwt');//para generar token
const nodemailer = require('nodemailer');

const grabaUsuario = require('../helpers/usuario/grabaUsuario');
const leeUsuario = require('../helpers/usuario/leeUsuario');
const leeUsuarioById =require('../helpers/usuario/leeUsuarioById');
const leeUsuarioByEmail =require('../helpers/usuario/leeUsuarioByEmail');

const leeEmail = require('../helpers/mails/leeEmail');
const leeOrganizaciones = require('../helpers/usuario/leeOrganizaciones');
const leeUsuarios = require ('../helpers/usuario/leeUsuarios' );
const insertarUsuario = require ('../helpers/usuario/insertarUsuario' );
const leeOrganizacionUsuario= require ('../helpers/usuario/leeOrganizacionUsuario' );
const eliminarUsuario = require ('../helpers/usuario/eliminarUsuario' );
const actualizarUsuario = require ('../helpers/usuario/actualizarUsuario' );
const leeEquiposOrganizacion= require ('../helpers/usuario/leeEquiposOrganizacion' );
const insertarGrupo =require ('../helpers/usuario/insertarGrupo' );
const actualizarGrupo =require ('../helpers/usuario/actualizarGrupo' );
const eliminarGrupo =require ('../helpers/usuario/eliminarGrupo' );
const leeParticipesGrupo=require ('../helpers/usuario/leeParticipesGrupo' );
const leeAutocompleteParticipes=require ('../helpers/usuario/leeAutocompleteParticipes' );
const actualizarParticipeGrupo =require ('../helpers/usuario/actualizarParticipeGrupo' );

const insertaOrganizacion =require('../helpers/usuario/insertarOrganizacion');
const actualizaOrganizacion = require('../helpers/usuario/actualizaOrganizacion');
const eliminaOrganizacion = require('../helpers/usuario/eliminaOrganizacion');
const insertaParticipanteAGrupo = require('../helpers/usuario/insertaParticipanteAGrupo');
const eliminarParticipanteDeGrupo=require('../helpers/usuario/eliminarParticipanteDeGrupo');
const crearReunion =require ('../helpers/usuario/crearReunion');
const reemplazaMetaDataMensaje=require('../helpers/reemplazaMetaData');

const crearUsuarioCtrl = async ( req, res = response ) =>{
    const { idOrganizacion, idPerfil , nombres, apellidos, email, password } = req.body; // en le body viene la información
    try{
        const externoInterno='E';
        //encriptar contraseña
        const usuario= await leeUsuario( email ) ;
        if ( !usuario ) {// no existe el usuario
            const salt = bcrypt.genSaltSync();//el número de vueltas es 10 si no se envía
            const pwd  = bcrypt.hashSync( password, salt ); //password encriptada
            const userName=null;
            const uid = await grabaUsuario( email, nombre, userName , pwd, idOrganizacion, idPerfil, externoInterno );
            const name = nombre;
            const token= await generarJWT( uid, name );     

            res.status(201).json({  // 201 es que se creo el registro
                ok: true,
                msg: 'crear usuario',
                uid,
                nombre,
                token
            });        
        }else {
            console.log('correo del usuario existe.')
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
}

const loginUsuario = async ( req , res = response  ) =>{
     //console.log('Login')
     const { email, password } = req.body;
     try {
        const usuario = await leeUsuario( email ) ;
        if  ( !usuario ){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario-constraseña no corresponden'
            });            
        }
        const { uid, clave, name , userName } = usuario;
        //console.log('loginUsuario:',uid, clave, name, userName ); 
        const validPassword = bcrypt.compareSync( password, clave );
        //console.log(uid, clave, name,validPassword ); 
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario-constraseña no corresponden.'
            });  
        }  
        //const name=nombres+' '+apellidos;
        const token= await generarJWT( uid, name );     
        res.json ({
            ok:true,
            uid,
            name,
            userName,
            token
        })
     }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
}

const revalidarToken= async (req , res = response  ) =>{
        
    const {uid , name } =req;
    console.log('revalidarToken:',uid , name );

    const usuario= await leeUsuarioById( uid ) ;
    if  ( !usuario ){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no está registrado'
        });            
    }
    //console.log('revalidarToken:',usuario)
    //generamos un nuevo token    
    const token= await generarJWT( uid, name ); 
    res.json({ 
        ok: true,
        uid,
        name,
        userName: usuario.UserName,
        token
    })
};
const sendEmails = async  ( req, res = response ) => { //utiliza nodemailer
    const {name, destinatario, copiaOculta, asunto, email, mensaje, idMail ,idReunion }= req.body;
    
    
    const  contenidoHTML  =await leeEmail ( idMail ); // lee mensajes de la BD
    const contentHTML =`${ contenidoHTML }`;// lo interpreta com HTML
    // console.log('auth/sendMail, name: ',name);
    // console.log('email:',email);
    // console.log('mensaje', mensaje);
    //console.log('idMail-idDestino:', idMail, idDestino );
    //console.log('destinatario:',destinatario)
    //console.log('SendMail',contenidoHTML,contentHTML );
    //console.log(contentHTML);
    console.log('idReunion:',idReunion);
    const body=reemplazaMetaDataMensaje(contentHTML); 
    res.send('Recibido');
 return;
    const transporter= nodemailer.createTransport({
        host: 'mail.cibeles.cl',
        port: 6767,
        secure: false,
        auth: {
            user: 'suscribe@cibeles.cl',
            pass: 'Clave1234.'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const info = await transporter.sendMail({
        from: name, 
        to: destinatario,
        //replyTo: `"<${ mailCopia }>"`,
        //replyTo:`"<${ mailCopia }>"`,
        subject: asunto, //asunto
        //text:  mensaje, // si no es HTML
        bcc:copiaOculta,// copia oculta
        html: body,
        // attachments: [
        //     {
        //       filename: 'scriptBD',
        //       path: 'C:/GPS/scriptBD.sql',
        //       cid: 'uniq-scriptBD.sql' 
        //     }
        //   ]
    });
     console.log('Mensaje id:',info );
     res.send('Recibido');
}
const cargaOrganizaciones = async ( req , res = response  ) =>{
    //const { email} = req.body;
    console.log('auth/cargaOrganizaciones');
    try {
       const data = await leeOrganizaciones (  ) ;
       //console.log('controlador:',organizaciones );
       if  ( !data ){
           return res.status(400).json({
               ok: false,
               msg: 'No existen organizaciones '
           });            
       }
       res.json ({
           ok:true,
           data
       })
    }catch( error) {
       console.log(error);
       res.status (500).json ({
           ok: false,
           msg: 'Favor hablar con el administrador'
       });
   }
}
const insertarNewOrganizacion =async ( req, res = response ) => {
    const { organizacion, rut } = req.body; // en le body viene la información
    console.log('insertarNewOrganizacion',organizacion, rut );
    try{
        const data = await insertaOrganizacion( organizacion, rut );
        //console.log('organiza',organiza)
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'crear organización',
                 data     
             });         
        // }else {
        //     console.log('correo del usuario existe.')
        //     return res.status(400).json({
        //         ok:false,
        //         msg: 'Un usuario ya existe con ese correo'
        //     });
        //}
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
const actualizarOrganizacion =async ( req, res = response ) => {
    const { id, organizacion, rut } = req.body; // en le body viene la información
    //console.log('actualizarOrganizacion',id, organizacion, rut  );
    try{
        const data = await actualizaOrganizacion( id, organizacion, rut );
        //console.log('organiza',organiza)
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'actualizar organización',
                 data     
             });         
        // }else {
        //     console.log('correo del usuario existe.')
        //     return res.status(400).json({
        //         ok:false,
        //         msg: 'Un usuario ya existe con ese correo'
        //     });
        //}
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
const eliminarOrganizacion =async ( req, res = response ) => {
    const { id, organizacion, rut } = req.body; // en le body viene la información
    //console.log(req.body );
    try{
        const organiza = await eliminaOrganizacion( id, organizacion, rut );
        //console.log('organiza',organiza)
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'eliminar organización',
                 organiza     
             });         
        // }else {
        //     console.log('correo del usuario existe.')
        //     return res.status(400).json({
        //         ok:false,
        //         msg: 'Un usuario ya existe con ese correo'
        //     });
        //}
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
const leeUsuariosCtrl = async ( req , res = response  ) =>{
    
    console.log('controlador-leeUsuariosCtrl'); 
    try {
       const data = await leeUsuarios (  ) ;
    //    console.log('controlador-leeUsuariosCtrl :',data );
       if  ( !data ){
           return res.status(400).json({
               ok: false,
               msg: 'No existen usuarios '
           });            
       }
       res.json ({
           ok:true,
           data
       })
    }catch( error) {
       console.log(error);
       res.status (500).json ({
           ok: false,
           msg: 'Favor hablar con el administrador'
       });
   }
};
const eliminarUsuarioCtrl =async ( req, res = response ) => {
    const { email, organizacion    } = req.body; // en le body viene la información
    //console.log('eliminar usuario:',req.body );
    try{
        const data = await eliminarUsuario( email, organizacion );
            res.status(201).json({  
                ok: true,
                 msg: 'eliminar usuario',
                 data     
             });         
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
const actualizarUsuarioCtrl =async ( req, res = response ) => {
    const { email, nombre, celular, IdOrganizacion } = req.body; // en le body viene la información
    //console.log('actualizar usuario:',req.body );
    try{
        const data = await actualizarUsuario( email, nombre, celular, IdOrganizacion );

            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'actualizar usuario',
                 data
             });         
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
}; 
const insertarUsuarioCtrl =async ( req, res = response ) => {
    const { email, nombre, IdOrganizacion, celular } = req.body; // en le body viene la información
    console.log('insertarUsuarioCtrl:',email, nombre, IdOrganizacion, celular );
    const password="123456.";
    const salt = bcrypt.genSaltSync();//el número de vueltas es 10 si no se envía
    const pwd  = bcrypt.hashSync( password, salt ); //password encriptada
    
    // const uid = await grabaUsuario( email, nombres, apellidos, userName , pwd, idOrganizacion, idPerfil, externoInterno );
    // const nombre = nombre;
    // const token= await generarJWT( uid,nombre );    


    try{
        const usuario = await insertarUsuario( email, nombre, IdOrganizacion, celular , pwd );
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'insertar usuario',
                 usuario
             });         
        }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
const leeOrganizacionUsuarioCtrl = async ( req , res = response  ) =>{
    const { email }  = req.body;
    console.log('leeOrganizacionUsuarioCtrl', req.body );
    try {
       const data = await leeOrganizacionUsuario ( email ) ;
       //console.log('controlador-leeOrganizacionUsuarios :',usuarios );
       if  ( !data ){
           return res.status(400).json({
               ok: false,
               msg: 'No existen organizaciones para el usuario '
           });            
       }
       res.json ({
           ok:true,
           data
       })
    }catch( error) {
       console.log(error);
       res.status (500).json ({
           ok: false,
           msg: 'Favor hablar con el administrador'
       });
   }
};
const leeEquiposOrganizacionCtrl = async ( req , res = response  ) =>{
    const { idOrganizacion }  = req.body;
    console.log('leeEquiposOrganizacionCtrl', req.body );
    try {
       const data = await leeEquiposOrganizacion ( idOrganizacion ) ;
       if  ( !data ){
           return res.status(400).json({
               ok: false,
               msg: 'No existen equipos para la organización '
           });            
       }
       res.json ({
           ok:true,
           data
       })
    }catch( error) {
       console.log(error);
       res.status (500).json ({
           ok: false,
           msg: 'Favor hablar con el administrador'
       });
   }
};
const insertarGrupoCtrl =async ( req, res = response ) => {
    
    const { nombreEquipo, nombreAdministrador,emailAdministrador, celularAdministrador ,idOrganizacion, idUsuario } = req.body; // en le body viene la información
    //console.log('insertarGrupoCtrl:',nombreEquipo, nombreAdministrador,emailAdministrador, celularAdministrador ,idOrganizacion, idUsuario);
    try{
        const data = await insertarGrupo( nombreEquipo, nombreAdministrador,emailAdministrador, celularAdministrador ,idOrganizacion, idUsuario);
        //console.log('insertarGrupoCtrl-resp:',data) 
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'insertar grupo',
                 data
             });         
        }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
       
const eliminarGrupoCtrl =async ( req, res = response ) => {
    const { idEquipo, idOrganizacion} = req.body; // en le body viene la información
    //console.log('eliminar grupo:', idEquipo,idOrganizacion );
    try{
        const data = await eliminarGrupo(  idEquipo, idOrganizacion );
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'eliminar grupo',
                 data     
             });         
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
const actualizarGrupoCtrl =async ( req, res = response ) => {
    const { idEquipo,  nombreEquipo, nombreAdministrador,emailAdministrador, celularAdministrador, idOrganizacion } = req.body; // en le body viene la información
    //console.log('actualizar grupo:',idEquipo,  nombreEquipo, nombreAdministrador,emailAdministrador, celularAdministrador, idOrganizacion );
    try{
        const data = await actualizarGrupo( idEquipo,  nombreEquipo, nombreAdministrador,emailAdministrador, celularAdministrador, idOrganizacion );

            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'actualizar grupo',
                 data
             });         
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
}; 
const leeParticipesGrupoCtrl = async ( req , res = response  ) =>{
    const { idEquipo }  = req.body;
    console.log('leeParticipesGrupoCtrl', req.body );
    try {
       const data = await leeParticipesGrupo ( idEquipo ) ;
       if  ( !data ){
           return res.status(400).json({
               ok: false,
               msg: 'No existen partipantes para el equipo'
           });            
       }
       res.json ({
           ok:true,
           data
       })
    }catch( error) {
       console.log(error);
       res.status (500).json ({
           ok: false,
           msg: 'Favor hablar con el administrador'
       });
   }
};
const insertarParticipeAGrupoCtrl =async ( req, res = response ) => {
    const { nombre, idEquipo, email, idUsuario, celular ,idUsuarioModifica} = req.body; // idUsuario es el que agrega el participante
    //console.log(req.body );
    try{
        const data = await insertaParticipanteAGrupo( nombre, idEquipo, email, idUsuario, celular,idUsuarioModifica );
        //console.log('organiza',organiza)
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'crear nuevo participante a grupo',
                 data
             });         
        // }else {
        //     console.log('correo del usuario existe.')
        //     return res.status(400).json({
        //         ok:false,
        //         msg: 'Un usuario ya existe con ese correo'
        //     });
        //}
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
const eliminarParticipeDeGrupoCtrl =async ( req, res = response ) => {
    const { idEquipo, idUsuario, idUsuarioModifica } = req.body; // idUsuario es el que agrega el participante
    //console.log(req.body );
    try{
        const data = await eliminarParticipanteDeGrupo(  idEquipo, idUsuario, idUsuarioModifica );
        //console.log('organiza',organiza)
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'elminar participante de grupo',
                 data
             });         
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
const autocompleteParticipesCtrl = async ( req , res = response  ) =>{
    const {idOrganizacion, idEquipo }  = req.body;
    console.log('autocompleteParticipesCtrl', req.body );
    try {
       const data = await leeAutocompleteParticipes ( idOrganizacion, idEquipo ) ;
       if  ( !data ){
           return res.status(400).json({
               ok: false,
               msg: 'No existen partipantes para el equipo'
           });            
       }
       res.json ({
           ok:true,
           data
       })
    }catch( error) {
       console.log(error);
       res.status (500).json ({
           ok: false,
           msg: 'Favor hablar con el administrador'
       });
   }
};

const actualizarParticipeGrupoCtrl =async ( req, res = response ) => {
    const { idEquipo, idUsuario,  nombre,  celular , idUsuarioModifica  } = req.body; // en le body viene la información
    console.log('actualizar miembro de equipo:',idEquipo, idUsuario,  nombre,  celular, idUsuarioModifica );
    try{
        const data = await actualizarParticipeGrupo( idEquipo, idUsuario,  nombre,  celular, idUsuarioModifica );
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'actualizar participante equipo',
                 data
             });         
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
};
const crearReunionCtrl =async ( req, res = response ) => {
    const { idEquipo, diaHoraInicio, proposito , asisten,idUsuarioOrganiza } = req.body; // en le body viene la información
    //console.log('crar reunión:',idEquipo, asistentes );
    try{
        const data = await crearReunion( idEquipo, diaHoraInicio, proposito , asisten, idUsuarioOrganiza );
            res.status(201).json({  // 201 es que se creo el registro
                 ok: true,
                 msg: 'crear reunión',
                 data
             });         
    }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
}; 
const leeusrxemailCtrl= async (req , res = response  ) =>{
    
    const {email } = req.body;
    console.log('leeusrxemailCtrl', email) ;  
    try {
        const data = await leeUsuarioByEmail( email ) ;
        if  ( !data ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no está registrado'
            });            
        }
        res.json ({
            ok:true,
            data
        })
     }catch( error) {
        console.log(error);
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con el administrador'
        });
    }
}
module.exports = { 
                crearUsuarioCtrl, 
                loginUsuario,
                revalidarToken,
                sendEmails,
                cargaOrganizaciones,
                insertarNewOrganizacion,
                actualizarOrganizacion,
                eliminarOrganizacion,
                leeUsuariosCtrl,
                eliminarUsuarioCtrl,
                actualizarUsuarioCtrl,
                insertarUsuarioCtrl,
                leeOrganizacionUsuarioCtrl,
                leeEquiposOrganizacionCtrl,
                insertarGrupoCtrl,
                eliminarGrupoCtrl,
                actualizarGrupoCtrl,
                leeParticipesGrupoCtrl,
                insertarParticipeAGrupoCtrl,
                eliminarParticipeDeGrupoCtrl,
                autocompleteParticipesCtrl,
                actualizarParticipeGrupoCtrl,
                crearReunionCtrl,
                leeusrxemailCtrl,
            } 

    