const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const leeUsuarios = async (  ) =>{
    
    try{
        const procedureName =`LeeUsuarios`;
        //&console.log('lee usuario sp', dbconfig, userName, procedureName );
         return await  sql.connect(dbconfig)
          .then (pool => {
              //console.log('DB on line' );
              return pool.request()
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             //console.log(result );
             return recordset ;
          }).catch( err =>{
            console.log(err); 
          })  
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = leeUsuarios ;