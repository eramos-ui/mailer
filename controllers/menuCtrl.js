const { response } = require('express'); //para tener la intellisense
const leeToDoList = require('../helpers/menu/leeToDoList');

const menuCtrl = async ( req , res = response  ) => {
        const {uid , name } =req;
        //console.log('menuCtrl:',uid, name );
         try {
           const menu = await leeToDoList ( uid ) ;
           //console.log('menuCtrl:',menu );
           res.json ({
               ok:true,
               menu
            })
        }catch( error) {
            res.status (500).json ({
                ok: false,
                msg: 'Favor hablar con al administrador'
            })
        }
}


module.exports = { 
    menuCtrl 
            } 

    