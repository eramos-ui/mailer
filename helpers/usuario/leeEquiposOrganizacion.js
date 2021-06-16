
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');


const leeEquiposOrganizacion = async ( idOrganizacion  ) =>{ //para auth
    try{
        const procedureName =`LeeEquiposOrg`;
        
       // console.log('LeeEquiposOrg:', IdOrganizacion );
        return await sql.connect(dbconfig)
          .then (pool => {
             //console.log('DB on line LeeOrganizacionUsuario');
              return pool.request()
              .input('idOrganizacion', sql.Int, idOrganizacion )
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
module.exports = leeEquiposOrganizacion;