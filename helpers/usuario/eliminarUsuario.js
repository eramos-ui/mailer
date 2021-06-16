const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const eliminarUsuario = async ( email, organizacion ) =>{
    
    try{
        const procedureName =`eliminarUsuario`;
        console.log('sp: eliminar usuario');
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line eliminar usuario');
              return pool.request()
              .input('email',sql.VarChar, email)
              .input('organizacion', sql.VarChar, organizacion )
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             return recordset[0] ;
          }).catch( err =>{
            console.log(err); 
          })  
         //return 5;
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = eliminarUsuario ;