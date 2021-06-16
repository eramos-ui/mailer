
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');


const insertaParticipanteAGrupo = async ( nombre, idEquipo,email, idUsuario, celular ,idUsuarioModifica  ) =>{ //para auth
    try{
        const procedureName =`InsertaParticipeAGrupo`;
        

        return await sql.connect(dbconfig)
          .then (pool => {
             //console.log('DB on line LeeOrganizacionUsuario');
              return pool.request()
              .input('nombre', sql.VarChar, nombre )
              .input('idEquipo', sql.Int, idEquipo )
              .input('email', sql.VarChar, email )
              .input('idUsuario', sql.Int, idUsuario )
              .input('celular', sql.VarChar, celular )
              .input('idUsuarioModifica', sql.Int, idUsuarioModifica )
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             return recordset ;
          }).catch( err =>{
            console.log(err); 
          })  
         //return 5;
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = insertaParticipanteAGrupo;