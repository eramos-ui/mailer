
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const actualizarUsuario = async ( email, nombre, celular, IdOrganizacion  ) =>{
    
    try{
        const procedureName =`ActualizarUsuario`;
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line actualiza usuario');
              return pool.request()
              .input('email',sql.VarChar, email)
              .input('nombre', sql.VarChar, nombre )
              .input('celular', sql.VarChar, celular )
              .input('IdOrganizacion',sql.Int, IdOrganizacion)
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
module.exports = actualizarUsuario ;