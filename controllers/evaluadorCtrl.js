const { response } = require('express'); //para tener la intellisense

const  leeEvaluador =require ('../helpers/evaluador/leeEvaluador');
const  registraEvaluacion =require ('../helpers/evaluador/registraEvaluacion');

const  leeEvaluadorCtrl = async ( req , res = response  ) => {
   
   const {token } =req.body;
   //console.log('leeEvaluadorCtrl-token:',token);
    try {
      const data = await leeEvaluador ( token ) ;
      //console.log('leeEvaluadorCtrl-data:', data );
      res.json ({
          ok:true,
          data
       })
   }catch( error) {
       res.status (500).json ({
           ok: false,
           msg: 'Favor hablar con al administrador'
       })
   }
};

const  registraEvaluacionCtrl = async ( req , res = response  ) => {
   
    const {idReunion,idUsuario,token, evaluacion } =req.body;
    console.log('registraEvaluacionCtrl:',idReunion,token, evaluacion);
     try {
       const data = await registraEvaluacion ( idReunion, token, evaluacion ) ;
       //console.log('leeEvaluadorCtrl-data:', data );
       res.json ({
           ok:true,
           data
        })
    }catch( error) {
        res.status (500).json ({
            ok: false,
            msg: 'Favor hablar con al administrador'
        })
    }
 };
module.exports = { 
    leeEvaluadorCtrl,
    registraEvaluacionCtrl,
} 
