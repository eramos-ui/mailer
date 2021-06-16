
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');

const actualizaEnvioLink = async ( token, messageId  ) =>{ 
    // const idReunion=links.idReunion;
    // const idUsuario=links.idUsuario; 
    // const token=links.token;   
    console.log('actualizaEnvioLink:', token, messageId);
    try{
        const procedureName =`ActualizarEnvioLink`;
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line actualiza envio link');
              return pool.request()
              // .input('idReunion',sql.Int, idReunion)
              // .input('idUsuario',sql.Int, idUsuario) 
              .input('token', sql.VarChar, token )
              .input('info', sql.VarChar, messageId )
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             return recordset[0] ;
          }).catch( err =>{ 
            console.log(err); 
          })  
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD'); 
     }
}
module.exports = actualizaEnvioLink;