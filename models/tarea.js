const { v4: uuid } = require('uuid');

class Tarea {
    id = '';
    description = '';
    completadoEn = null;

    constructor( id, description, completadoEn) {
        this.id = id ? id : uuid();
        this.description = description;
        this.completadoEn = completadoEn ? completadoEn : null;
    }
}

module.exports = Tarea;