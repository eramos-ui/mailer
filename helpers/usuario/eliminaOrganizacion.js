//eliminarOrganizacion


const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const eliminaOrganizacion = async ( id,  organizacion , rut ) =>{
    
    try{
        const procedureName =`EliminarOrganizacion`;
        
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line elimina organizacion');
              return pool.request()
              .input('id',sql.Int, id)
              .input('organizacion', sql.VarChar, organizacion )
              .input('rut', sql.VarChar, rut )
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
module.exports = eliminaOrganizacion ;