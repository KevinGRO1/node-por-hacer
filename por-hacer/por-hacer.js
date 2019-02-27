const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`DB/data.json`, data, (err) => {

        if (err)
            return err;
        else
            console.log(`data.json creado exitosamente`);

    });
}

const cargarDB = () => {
    try {

        listadoPorHacer = require('../DB/data.json');

    } catch (error) {

        listadoPorHacer = [];

    }



}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {

    cargarDB();

    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    // findIndex regresa el indice del elemento con la poscicion indicada
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;

    } else {
        console.log(index);
        return false;
    }

}

const borrar = (descripcion) => {
    //Forma del prosor

    cargarDB();

    let nuevoListtado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListtado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListtado;
        guardarDB();
        return true;
    }

    /*
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        //Splice nos permite elimitar X elementos a partir de cierta posicion
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;

    } else {
        return false;
    }*/

}

module.exports = {
    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar
}