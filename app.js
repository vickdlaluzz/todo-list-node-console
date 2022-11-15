require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu,
    pausa,
    leerInput, 
    borrarTarea,
    confirmar,
    mostrarCheckList} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
console.clear()
const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        console.log('si hay tareas');
        tareas.cargarTareas(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Escirba la descripcion de la tarea');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarByEstado(true);
                break;
            case '4':
                tareas.listarByEstado(false);
                break;
            case '5':
                const ids = await mostrarCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const tareaId = await borrarTarea(tareas.listadoArr);
                if (tareaId !== '0') {
                    const confirm = await confirmar('Estas seguro de eliminar la tarea seleccionada?'.bgYellow)
                    if (confirm) {
                        tareas.borrarTarea(tareaId);
                        console.log('La tarea ha sido eliminada'.bgRed);
                    }
                    
                }
                break;
            
            default:
                break;
        }

        leerDB();

        guardarDB(tareas.listadoArr);
        await pausa();
        
    } while ( opt !== '0');
    
}

main();