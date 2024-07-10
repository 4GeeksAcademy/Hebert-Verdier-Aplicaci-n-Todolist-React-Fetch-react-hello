import React from "react";
import { useState, useEffect } from "react";

const List = () => {
    // declaracion de estado
    const [inputTarea, setInputTarea] = useState('');
    const [lista, setLista] = useState([]);
    const [inputTareaModificada, setInputTareaModificada] = useState('');

    // login, crear usuario
    function login() {
        fetch('https://playground.4geeks.com/todo/users/HSimonVS', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
    }

    // traerTareas
    function traerTareas() {
        fetch('https://playground.4geeks.com/todo/users/HSimonVS', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status == '404') {
                    login()
                }
                return response.json()
            })
            .then((data) => setLista(data.todos))
            .catch((error) => console.log(error))
    }

    // agregarTareas
    function agregarTareas() {
        if (inputTarea.trim() != '') {
            fetch('https://playground.4geeks.com/todo/todos/HSimonVS', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'label': inputTarea,
                    'isDone': false
                })
            })
                .then((response) => {
                    if (response.status === 201) {
                        traerTareas()
                    }
                    return response.json()
                })

                .then((data) => console.log(data))
                .catch((error) => console.log(error))
        }
        setInputTarea('') //limpiar input
    }
    // actualizar tareas, solo actualiza la primera tarea, no funciona bien.
    function actualizarTareas(id) {
        if (inputTareaModificada.trim() != '') {
            fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'label': inputTareaModificada,
                    'isDone': false
                })
            })
                .then((response) => {
                    if (response.status === 200) {
                        traerTareas()
                    }
                    return response.json()
                })
                .then((data) => console.log(data))
                .catch((error) => console.log(error))
        }
        setInputTareaModificada('')
    }

    // eliminarTareas
    function eliminarTareas(id) {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status === 204) {
                    traerTareas()
                }
                return response.json()
            })
            .then((data) => console.log(data))
            .catch((error) => console.log(error))

    }

    // handleTarea
    function handleTarea(event) {
        setInputTarea(event.target.value);
    }

    function handleTareaModificada(event) {
        setInputTareaModificada(event.target.value);
    }

    // useEffect
    useEffect(() => {
        traerTareas()
    }, [])

    // return
    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
                <h1>todos</h1>
                <div className="d-flex flex-row">
                    <input className='' type="text" onChange={handleTarea} value={inputTarea} />
                    <button className="btn btn-primary" onClick={agregarTareas}>Agregar</button>
                </div>
                <p className="m-0 p-0">Tareas: {lista.length}</p>
                <div className="">
                    <ul className="list-group">
                        {lista.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between fs-4">
                                {item.label}
                                {/* {console.log('valor de 139-1' + item.id)} */}

                                <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <i className="fa fa-pen"></i>
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modificar Tarea</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <input type="" onChange={handleTareaModificada} value={inputTareaModificada} />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" data-bs-dismiss="modal" onClick={() => actualizarTareas(item.id)} className="btn btn-primary">Save changes</button>
                                                {/* {console.log('valor de 157-2' + item.id)} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* boton eliminar tarea */}
                                <button className="btn btn-outline-danger" onClick={() => eliminarTareas(item.id)} style={{ fontSize: '10px' }}>
                                    {/* {console.log('valor de 164-3' + item.id)} */}
                                    <i className="fa fa-trash"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default List;