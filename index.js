/*
const express = require('express'); 
//const Bree=require('bree');
require('dotenv').config(); //para las variables de entorno

const cors =  require('cors'); //para configurar una capa de seguridad las api

// console.log(process.env); // muestras las variables de entorno
const app = express();  //crea el servidor de express - middleware 

app.use(cors());

app.use( express.static('public' ));  //establece que el path raíz es public 

app.use( express.json()); // esto es para leer y parsear el body 
*/
const {enviaLinkCtrl} = require('./controllers/enviaLinkCtrl');
/*
// ruta, indica el path de la ruta y el archivo dónde está
app.use('/api/auth', require('./routes/auth'));

app.use('/api/menu', require('./routes/menu'));

app.use('/api/reunion', require('./routes/reunion'));
app.use('/api/evaluador', require('./routes/evaluador'));

// const bree = new Bree({
//     jobs : [
//       // runs the job on Start
//        //'test',
//        {
//            name: 'enviaLink',
//            interval :'5s'
//        }
//     ]
//   })
  
//   bree.start()

app.listen ( process.env.PORT ,() =>{
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
*/
//const links = await porEnviarLinksReunion ( ); //los que están pendientes
const salida = enviaLinkCtrl(); 
//console.log('Hola mundo');