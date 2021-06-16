

const  reemplazaMetaDataMensaje= async ( mensaje, metadata   ) =>{
    //console.log('reemplazaMetaDataMensaje:',mensaje,metadata,metadata.length);
    let msj=mensaje; 
    if (metadata.length> 0){
        metadata.forEach(element => {
            const index = msj.includes('#'+element.field+'#',0) ;
            //console.log('index:',index,element);
            if (index){
                msj = msj.replace('#'+element.field+'#', element.valor);
                //console.log('msj:',msj);
            }

        });
    }

    return msj;
};
module.exports = reemplazaMetaDataMensaje;