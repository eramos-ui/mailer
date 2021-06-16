
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');


const leeOrganizacionUsuario = async ( email  ) =>{ //para auth
    try{
        const procedureName =`LeeOrganizacionUsuario`;
        
        console.log('LeeOrganizacionUsuario:', email );
        return await sql.connect(dbconfig)
          .then (pool => {
             //console.log('DB on line LeeOrganizacionUsuario');
              return pool.request()
              .input('email', sql.VarChar, email )
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
module.exports = leeOrganizacionUsuario;