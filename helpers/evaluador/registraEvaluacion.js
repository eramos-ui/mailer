
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');

const registraEvaluacion = async ( idReunion,idUsuario,token, evaluacion ) =>{ 
    //console.log('registraEvaluacion', idReunion,idUsuario,token, JSON.stringify(evaluacion));
    try{
        const procedureName =`RegistraEvaluacion`;
         return await  sql.connect( dbconfig )
          .then (pool => {
              //console.log('DB on line');
              return pool.request()
              .input('idReunion', sql.Int, idReunion ) 
              .input('idUsuario', sql.Int, idUsuario ) 
              .input('token', sql.VarChar, token ) 
              .input('evaluacion', sql.VarChar, evaluacion ) 
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             return recordset;
          }).catch( err =>{
            console.log(err); 
          })  
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = registraEvaluacion;