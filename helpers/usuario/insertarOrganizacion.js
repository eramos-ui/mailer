

const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const insertaOrganizacion = async (  organizacion , rut ) =>{
    
    try{
        const procedureName =`InsertarOrganizacion`;
        
        //console.log('Inserta organización:',organizacion, rut );
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line Graba organizacion');
              return pool.request()
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
module.exports = insertaOrganizacion ;