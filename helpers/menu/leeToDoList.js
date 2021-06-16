
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig');


const leeToDoList = async ( uid ) =>{
    try{
       const procedureName =`MenuList`;
       //console.log('lee toDoList sp', dbconfig, uid, procedureName );
        return await  sql.connect(dbconfig)
         .then (pool => {
             console.log('DB on line' );
             return pool.request()
             .input('IdUsuario', sql.Int, uid )
             .execute( procedureName );
         }).then(result => {
            const { recordset }= result;
            //console.log(recordset );
            return recordset ;
         }).catch( err =>{
           console.log(err); 
         })  
    }catch (err) {
        console.log(err);
        throw new Error('Error al conectar BD');
    }
}
module.exports = leeToDoList;