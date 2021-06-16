

const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const leeOrganizaciones = async (  ) =>{
    
    try{
        const procedureName =`LeeOrganizaciones`;
        console.log('lee usuario sp' );
         return await  sql.connect(dbconfig)
          .then (pool => {
              //console.log('DB on line' );
              return pool.request()
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             //console.log(result );
             return recordset ;
          }).catch( err =>{
            console.log(err); 
          })  
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = leeOrganizaciones ;