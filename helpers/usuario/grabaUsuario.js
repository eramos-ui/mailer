

const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 
// email, nombres, apellidos, userName , pwd, idOrganizacion, idPerfil, externoInterno
const grabaUsuario = async ( email ,nombre, userName, password ,idOrganizacion ,idPerfil, externoInterno  ) =>{
    
    try{
       const procedureName =`GrabaUsuario`;
       
       if ( !userName )  {//undefined
          userName= email;
       } 
       //console.log('Grabar usuario:',email, nombres, apellidos, idOrganizacion, idPerfil,externoInterno, userName , password );
       return await  sql.connect(dbconfig)
         .then (pool => {
             // console.log('DB on line Graba usuario');
             return pool.request()
             .input('Email', sql.VarChar, email )
             .input('Nombre', sql.VarChar, nombre )
             .input('UserName', sql.VarChar, userName )
             .input('Clave', sql.VarChar, password )
             .input('IdOrganizacion', sql.Int, idOrganizacion )
             .input('IdPerfil', sql.Int, idPerfil )
             .input('ExternoInterno', sql.VarChar, externoInterno )
             .execute( procedureName );
         }).then(result => {
            const { recordset }= result;
            return recordset[0] ;
         }).catch( err =>{
           console.log(err); 
         })  
        return 5;
    }catch (err) {
        console.log(err);
        throw new Error('Error al conectar BD');
    }
}
module.exports = grabaUsuario ;