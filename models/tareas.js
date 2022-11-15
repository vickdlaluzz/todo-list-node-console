const Tarea = require("./tarea");

class Tareas {
    _listado = {};


    constructor() {
        this._listado = {}
    }

    crearTarea(description = '') {
        const tarea  = new Tarea(null, description, null);
        this._listado[tarea.id] = tarea;
    }

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            listado.push(this._listado[key]);
        }) 

        return listado;
    }

    cargarTareas(data = []) {
        data.forEach((element) => {
            this._listado[element.id] = new Tarea(element.id, element.description, element.completadoEn );
        })
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, index) => {
            let salida = `${ index + 1 }) `.green;
            salida += tarea.description;
            salida += tarea.completadoEn ? ' | ' + 'Completada'.bgGreen : ' | ' + 'Pendiente'.bgRed;
            console.log(salida);
        })
        console.log();

    }

    listarByEstado(completadas) {
        console.log();
        this.listadoArr.forEach((tarea, index) => {
            let salida = '';
            salida += `${ index + 1 }) `.green;
            salida += tarea.description;
            salida += tarea.completadoEn ? ' | ' + 'Completada'.bgGreen : ' | ' + 'Pendiente'.bgRed;

            if (completadas && tarea.completadoEn) {
                console.log(salida);
            } 
            if (!completadas && tarea.completadoEn === null) {
                console.log(salida);

            }
        })
        console.log();
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids =[]) {
        ids.forEach((id) => {
            this._listado[id].completadoEn = new Date().toISOString();
        })

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;