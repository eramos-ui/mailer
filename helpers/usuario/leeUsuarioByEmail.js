
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');

const leeUsuarioByEmail = async ( email ) =>{
    try{
       const procedureName =`LeeUsuarioByEmail`;
       console.log('LeeUsuarioByEmail sp', email );
        return await  sql.connect(dbconfig)
         .then (pool => {
             console.log('DB on line');
             return pool.request()
             .input('Email', sql.VarChar, email )
             .execute( procedureName );
         }).then(result => {
            const { recordset }= result;
            //console.log('LeeUsuarioByEmail:',recordset)
            return recordset[0];
         }).catch( err =>{
           console.log(err); 
         })  
    }catch (err) {
        console.log(err);
        throw new Error('Error al conectar BD');
    }
}
module.exports = leeUsuarioByEmail;