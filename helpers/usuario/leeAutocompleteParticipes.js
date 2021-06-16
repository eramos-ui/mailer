const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');


const leeAutocompleteParticipes = async ( idOrganizacion, idEquipo ) =>{ //para auth
    try{
        const procedureName =`leeAutocompleteParticipes`;
        
       // console.log('LeeParticipesGrupo:', idEquipo );
        return await sql.connect(dbconfig)
          .then (pool => {
             //console.log('DB on line LeeOrganizacionUsuario');
              return pool.request()
              .input('idOrganizacion', sql.Int, idOrganizacion )
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
module.exports = leeAutocompleteParticipes;