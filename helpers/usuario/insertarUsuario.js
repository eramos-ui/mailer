

const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const insertarUsuario = async ( email, nombre, IdOrganizacion, celular, pwd ) =>{
    console.log('insertarUsuario:', email, nombre, IdOrganizacion, celular,pwd);
    try{
        const procedureName =`InsertarUsuario`;
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line Inserta Usuario');
              return pool.request()
              .input('email', sql.VarChar, email )
              .input('nombre', sql.VarChar, nombre )
              .input('IdOrganizacion', sql.Int, IdOrganizacion )
              .input('celular', sql.VarChar, celular )
              .input('clave', sql.VarChar, pwd )
              .execute( procedureName );
          }).then(result => {
              
             const { recordset }= result;
             //console.log('recordset:',recordset);
             return recordset[0] ;
          }).catch( err =>{
            console.log(err); 
          })  
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = insertarUsuario ;