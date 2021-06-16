const { response } = require('express'); //para tener la intellisense
const nodemailer = require('nodemailer');
const porEnviarLinks = require('../helpers/mails/porEnviarLinks');
//const reemplazaMetaDataMensaje=require('../helpers/reemplazaMetaData');
const actualizaEnvioLink =require('../helpers/mails/actualizaEnvioLink');

const enviaLinkCtrl = async ( ) => {
        
        setInterval( async () => 
           {
            try{
              const links = await porEnviarLinks ( ); //los que están pendientes
               try {     
                   console.log('links:',links.length) ;    
                    if (links.length >0) {
                        await Promise.all(links.map(async (link) => {
                            //console.log('link:',link);
                            try{
                                await EnviarMailCtrl( link ); //envía de a 1 mensaje 
                            }catch( error) {
                                console.log(error);
                            }
                        }));
                    }
               }catch( error) {
                    console.log(error);
               }
            }catch( error) {
                    console.log(error);
              }
           }, 30000) // cada 30 seg sale un potencial mail
             //console.log('enviaLinkCtrl:',respuesta);
             //clearInterval(intervalID);
};
const EnviarMailCtrl = async ( data ) =>{ 
        const encabezado=data.mensajeEncabezado;
        const mensajeEntreMedio=data.mensajeEntreMedio;
        const mensajeFinal=data.mensajeFinal;
        const destinatarios=data.destinatarios;
        const remitente=data.remitente;
        const asunto=data.asunto;
        const copiaOculta=data.copiaOculta;//mail.copiaOculta;
        
        const img='';//mail.nombreFisicoImagen;
        const horainicio=data.HoraInicio;
        const textoEnlace=data.textoEnlace; //ejemplo:https://github.com/nodemailer/nodemailer/blob/master/examples/full.js
        const transporter=  nodemailer.createTransport({
                host: 'mail.cibeles.cl', 
                port: 6767,
                secure: false,
                auth: {user: 'suscribe@cibeles.cl',pass: 'Clave1234.'},
                tls: { rejectUnauthorized: false }
         });
        let message = {
                from: remitente, 
                to: destinatarios,//'Nodemailer <example@nodemailer.com>' // Comma separated list of recipients
                // Subject of the message
                subject: asunto ,// 'Nodemailer is unicode friendly ✔' + Date.now(),
                bcc:copiaOculta,

                // plaintext body
                //text: 'Hello to myself!',
                //text: $encabezado,
        
                // HTML body  para el link me ayuda https://es.ryte.com/wiki/Anchor_Tag
                // prueba <p><img src="http://131.72.237.194/App/Images/logo-colungatransforma-celeste.png"/></p>
                //sacada de antes del /p <img src="cid:note@example.com"/> este es le checked
                // despues de /p  <p><img src="cid:nyan@example.com"/></p> esta es la imagen
                //<p><img src="cid:imagen@example.com"/></p>
                //<a href="http://131.72.237.194/App/Images/logo-colungatransforma-celeste.png">imagen </a> 
                //<img src="cid:checked@example.com"/>
                //html: `<p><b>${nombreDestinatario}: <br>  <br> </b>${encabezado}  <br>
                //  <a href="${link} " > ${textoEnlace}</a> 
                html: `<p> ${encabezado} </p> <br>
                <br>
                <br> ${mensajeEntreMedio}
                <!-- <p><br>  </p> <br> -->
                <p> ${mensajeFinal}  </p>

                `, 
        
                // <p> (si no opera el enlace, puede escribir directamente en el navegador ${link} ) </p> 
                // <p><a >Código de acceso: ${code} </a></p>
                //<a class="copy-text">copy Text</a>   ${code}
    /*                  
                // AMP4EMAIL ---los amp son adjuntos
                amp: `<!doctype html>
                <html ⚡4email>
                <head>
                    <meta charset="utf-8">
                    <style amp4email-boilerplate>body{visibility:hidden}</style>
                    <script async src="https://cdn.ampproject.org/v0.js"></script>
                    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                </head>
                <body>
                <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                <p>GIF (requires "amp-anim" script in header):<br/>
                    <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
                </body>
                </html>`,
    */            
    /*                  
                attachments: [  // An array of attachments
                // {
                //     filename: 'image.jpg',
                //     content: '/9j/4AA ... Q==',
                //     encoding: 'base64',
                //     cid: 'unique@kreata.ee'
                // },
                        // String attachment
                    // {
                    //     filename: 'notes.txt',
                    //     content: 'Some notes about this e-mail',
                    //     contentType: 'text/plain' // optional, would be detected from the filename
                    // },
        
                    // Binary Buffer attachment --le pone un checked despues del lema
                //    {
                //        filename: `candidato`,
                //        // 'crubio.png','ppolitzer.png'
                //        content: Buffer.from(
                //            'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                //                '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                //                'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                //            'base64'
                //        ),
                //        cid: 'checked@example.com' // should be as unique as possible
                //    },
                    // File Stream attachment
                    {
                        filename: 'candidato cat ✔.png',
                
                        //path: __dirname + '/assets/ppolitzer.png',
                        path: dirPath, //+ '/assets/'+ 'ppolitzer.png' ,
                        cid: 'imagenCandidato' // should be as unique as possible
                    }
                ],
    */
    /*
                list: {
                    // List-Help: <mailto:admin@example.com?subject=help>
                    help: 'admin@example.com?subject=help',
                    // List-Unsubscribe: <http://example.com> (Comment)
                    unsubscribe: [
                        {
                            url: 'http://131.72.237.194/App/Images/logo-colungatransforma-celeste.png',
                            comment: 'A short note about this url'
                        },
                        'unsubscribe@example.com'
                    ],
                    // List-ID: "comment" <example.com>
                    id: {
                        url: 'mylist.example.com',
                        comment: 'This is my awesome list'
                    }
                    
            }
    */             
          };
        await transporter.sendMail(message, (error, info) => {
                    if (error) {
                        console.log('Error occurred');
                        console.log(error.message);
                        //ActualizaEnvioMail(idRegistro,'error:'+ error +', info:'+ info , 0);
                        return process.exit(1);
                    }
                    // only needed when using pooled connections
                    transporter.close();
                    actualizaEnvio( data,  info.messageId);
        })
 };
const actualizaEnvio = async ( data, messageId ) =>{  
    try{
       const dataX = await actualizaEnvioLink(data.token, messageId );
       return dataX;
    }catch( error) {
      console.log(error);
    }
  };
module.exports = { 
    enviaLinkCtrl
            }
 