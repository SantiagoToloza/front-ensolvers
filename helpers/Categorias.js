const convertir = (dato) => {
    if(dato === 1){
        return "Por hacer"
    }else if (dato === 2 ){
        return "En Proceso"
    }else{
        return "Finalizado"
    }
}

export default convertir