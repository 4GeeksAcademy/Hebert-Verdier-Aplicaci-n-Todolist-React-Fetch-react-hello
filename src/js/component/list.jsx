import React from "react";
import { useState, useEffect } from "react";

const List = () => {
    // declaracion de estado
    const [inputTarea, setInputTarea] = useState('');
    const [lista, setLista] = useState([]);

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
                                <button className="btn btn-light" onClick={() => eliminarTareas(item.id)} style={{ fontSize: '10px' }}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default List;