
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const actualizarGrupo = async ( idEquipo,  nombreEquipo, nombreAdministrador,emailAdministrador, celularAdministrador, idOrganizacion   ) =>{
    
    try{
        const procedureName =`ActualizarGrupo`;
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line actualiza grupo');
              return pool.request()
              .input('idEquipo',sql.Int, idEquipo)
              .input('nombreEquipo', sql.VarChar, nombreEquipo )
              .input('nombreAdministrador', sql.VarChar, nombreAdministrador )
              .input('emailAdministrador',sql.VarChar, emailAdministrador)
              .input('celularAdministrador', sql.VarChar, celularAdministrador )
              .input('IdOrganizacion',sql.Int, idOrganizacion)
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
module.exports = actualizarGrupo ;