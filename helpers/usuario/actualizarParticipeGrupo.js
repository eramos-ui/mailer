
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const actualizarParticipeGrupo = async ( idEquipo, idUsuario,  nombre,  celular, idUsuarioModifica ) =>{
    
    try{
        const procedureName =`ActualizarParticipeGrupo`;
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line actualiza grupo');
              return pool.request()
              .input('idEquipo',sql.Int, idEquipo)
              .input('idUsuario',sql.Int, idUsuario)
              .input('nombreParticipe', sql.VarChar, nombre )
              .input('celular', sql.VarChar, celular )
              .input('idUsuarioModifica',sql.Int, idUsuarioModifica)
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
module.exports = actualizarParticipeGrupo ;