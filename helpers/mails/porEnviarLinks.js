
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');


const porEnviarLinks = async (  ) =>{ //para auth
    console.log('sp porEnviarLink');
    try{
        const procedureName =`porEnviarLink`;
         return await  sql.connect( dbconfig )
          .then (pool => {
              //console.log('DB on line');
              return pool.request()
              //.input('idReunion', sql.Int, idReunion ) 
              //.input('MailWhatsapp', sql.Char, 'M' ) 
              .execute( procedureName );
          }).then(result => {
             
             const { recordset }= result;
            //console.log('porEnviarLinkReunion-result:',recordset);
             return recordset;
          }).catch( err =>{
            console.log(err); 
          })  
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD en porEnviarLinks ');
     }
}
module.exports = porEnviarLinks;