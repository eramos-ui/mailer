
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const insertarGrupo = async ( nombreEquipo, nombreAdministrador,emailAdministrador, celularAdministrador ,idOrganizacion, idUsuario) =>{
    console.log('insertarGrupo:', nombreEquipo, nombreAdministrador,emailAdministrador, celularAdministrador ,idOrganizacion, idUsuario);
    try{
        const procedureName =`InsertarGrupo`;
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line Inserta Grupo');
              return pool.request()
              .input('nombreEquipo', sql.VarChar, nombreEquipo )
              .input('nombreAdministrador', sql.VarChar, nombreAdministrador )
              .input('emailAdministrador', sql.VarChar, emailAdministrador )
              .input('idOrganizacion', sql.Int, idOrganizacion )
              .input('celularAdministrador', sql.VarChar, celularAdministrador )              
              .input('idUsuario', sql.Int, idUsuario )
              .execute( procedureName );
          }).then(result => {
              
             const { recordset }= result;
             //console.log('recordset:',recordset);
             return recordset[0] ;
          }).catch( err =>{
            console.log(err); 
          })  
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = insertarGrupo ;