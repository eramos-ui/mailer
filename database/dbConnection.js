
const sql = require('mssql'); 
const   dbconfig  = require('./dbconfig');


const dbConnection = async() =>{
  try{
    // console.log(dbconfig);
     await sql.connect( dbconfig  );
    console.log('DB Online');
  }catch (error){
    console.log(err);
    throw new Error('Error al conectar BD');   
  }
}
module.exports = {
    dbConnection
}