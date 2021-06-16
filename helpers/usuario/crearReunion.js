
const sql = require('mssql'); 
const dbconfig = require('../../database/dbconfig'); 

const crearReunion = async (  idEquipo, diaHoraInicio, proposito , asisten, idUsuarioOrganiza  ) =>{
     //console.log('crearReunion:',idEquipo, diaHoraInicio, proposito,idUsuarioOrganiza );
    // console.log('crearReunion-asistentes:',JSON.stringify(asisten));
    try{
        const procedureName =`crearReunion`;
        return await sql.connect(dbconfig)
          .then (pool => {
             console.log('DB on line crear reunión');
              return pool.request()
              .input('idEquipo',sql.Int, idEquipo)
              .input('diaHoraInicio',sql.DateTime, diaHoraInicio)
              .input('proposito',sql.VarChar, proposito)
              //.input('asisten', sql.VarChar, JSON.stringify(asisten) )
              .input('asisten', sql.VarChar,asisten )
              .input('idUsuarioOrganiza',sql.Int, idUsuarioOrganiza)
              .execute( procedureName );
          }).then(result => {
             const { recordset }= result;
             return recordset[0] ;
          }).catch( err =>{
            console.log(err); 
          })  
         //return 5;
     }catch (err) {
         console.log(err);
         throw new Error('Error al conectar BD');
     }
}
module.exports = crearReunion ;