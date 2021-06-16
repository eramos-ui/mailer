const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const eliminarGrupo = async ( idEquipo, idOrganizacion) =>{
    
    try{
        const procedureName =`eliminarGrupo`;
        console.log('sp: eliminar grupo',idEquipo,idOrganizacion);
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line eliminar grupo');
              return pool.request()
              .input('idEquipo',sql.Int, idEquipo)
              .input('idOrganizacion',sql.Int, idOrganizacion)
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
module.exports = eliminarGrupo ;