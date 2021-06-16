
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');


const leeEvaluador = async ( token ) =>{ 
    console.log('leeEvaluador', token);
    try{
        const procedureName =`leeEvaluador`;
         return await  sql.connect( dbconfig )
          .then (pool => {
              //console.log('DB on line');
              return pool.request()
              //.input('idReunion', sql.Int, idReunion ) 
              .input('token', sql.VarChar, token ) 
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
         throw new Error('Error al conectar BD');
     }
}
module.exports = leeEvaluador;