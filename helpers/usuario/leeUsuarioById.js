
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');



const leeUsuarioById = async ( uid  ) =>{ //para auth
    try{
        const procedureName =`LeeUsuarioById`;
        //console.log('leeUsuarioById sp', uid );
         return await  sql.connect(dbconfig)
          .then (pool => {
              console.log('DB on line');
              return pool.request()
              .input('uid', sql.Int, uid )
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             //console.log('LeeUsuarioById:',recordset)
             return recordset[0];
          }).catch( err =>{
            console.log(err); 
          })  
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = leeUsuarioById;