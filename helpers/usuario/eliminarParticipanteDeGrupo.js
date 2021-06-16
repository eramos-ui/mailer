const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');


const eliminarParticipanteDeGrupo = async (  idEquipo, idUsuario, idUsuarioModifica  ) =>{ //para auth
    try{
        const procedureName =`eliminarParticipeDeGrupo`;
        console.log('eliminarParticipanteDeGrupo:',  idEquipo, idUsuario, idUsuarioModifica );
        return await sql.connect(dbconfig)
          .then (pool => {
              return pool.request()
              .input('idEquipo', sql.Int, idEquipo )
              .input('idUsuario', sql.Int, idUsuario )
              .input('idUsuarioModifica', sql.Int, idUsuarioModifica )
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             return recordset ;
          }).catch( err =>{
            console.log(err); 
          })  

     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = eliminarParticipanteDeGrupo;