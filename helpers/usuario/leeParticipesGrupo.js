const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');


const leePartitipesGrupo = async ( idEquipo ) =>{ //para auth
    try{
        const procedureName =`LeeParticipesGrupo`;
        
       // console.log('LeeParticipesGrupo:', idEquipo );
        return await sql.connect(dbconfig)
          .then (pool => {
             //console.log('DB on line LeeOrganizacionUsuario');
              return pool.request()
              .input('idEquipo', sql.Int, idEquipo )
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
module.exports = leePartitipesGrupo;