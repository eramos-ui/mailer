
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');



const leeEmail = async ( idMail  ) =>{ //para auth
    try{
        const procedureName =`LeeMail`;
        //console.log('LeeMail sp', idMail, dbconfig);
         return await  sql.connect( dbconfig )
          .then (pool => {
              //console.log('DB on line');
              return pool.request()
              .input('IdMail', sql.Int, idMail ) 
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             //console.log('sp', recordset[0] );
             return recordset[0].mensajeHTML ;
          }).catch( err =>{
            console.log(err); 
          })  
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = leeEmail;