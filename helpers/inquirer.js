const inquirer = require('inquirer');
require('colors')


const inquirerMenu = async() => {
    const choices = [
        {
            value: '1',
            name: `${'1)'.green} Crear una tarea`
        },
        {
            value: '2',
            name: `${'2)'.green} Listar todas las tareas`
        },
        {
            value: '3',
            name: `${'3)'.green} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4)'.green} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5)'.green} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6)'.green} Borrar tarea(s)`
        },
        
        {
            value: '0',
            name: '0) Salir'
        },
    ]
    const questions = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Que desea hacer?',
            choices
        }
    ]
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opcion'.green);
    console.log('========================='.green);
    const { opcion } = await inquirer.prompt(questions);
    return opcion;
}

const pausa = async() => {
    await inquirer.prompt([
        {
            type: 'input',
            message: `Presione ${ 'ENTER'.green } para continuar`,
            name: 'key'
        }
    ])
    return 0;
}

const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'description',
        message,
        validate( value ) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor para la descripcion de la tarea';
            }
            return true;
        }
    }];

    const { description } = await inquirer.prompt(question);
    return description;

}

const borrarTarea = async(tareas = []) => {
    const choices = tareas.map( (tarea, idx) => {
        const index = `${idx + 1 })`.green;
        return {
            value: tarea.id,
            name: `${ index } ${ tarea.description }`
        }
    })

    choices.unshift(
        {
            value: '0',
            name: '0) '.green + 'Cancelar'
        }
    )
    const questions = [
        {
            type: 'list',
            name: 'tareaBorrar',
            choices,
            message: 'Tarea a eliminar'
        }
    ];
    const { tareaBorrar } = await inquirer.prompt(questions);
    return tareaBorrar;
}

const confirmar = async(message = '') => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question);

    return ok;
}

const mostrarCheckList = async(tareas = []) => {
    const choices = tareas.map( (tarea, idx) => {
        const index = `${idx + 1 })`.green;
        return {
            value: tarea.id,
            name: `${ index } ${ tarea.description }`,
            checked: tarea.completadoEn ? true : false
        }
    })
    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            choices,
            message: 'Seleccione'
        }
    ];
    const { ids } = await inquirer.prompt(questions);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    borrarTarea,
    confirmar,
    mostrarCheckList
}