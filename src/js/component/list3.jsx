import React from "react";
import { useState, useEffect } from "react";

const List = () => {
	// declaracion de estado
	const [inputTarea, setInputTarea] = useState('');
	const [lista, setLista] = useState([]);

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
	function traerTareas() {
		fetch('https://playground.4geeks.com/todo/users/HSimonVS', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => setLista(data.todos))
			.catch((error) => console.log(error))
	}

	function handleTarea(event) {
		setInputTarea(event.target.value);
	}

	function agregarTarea(e) {
		e.preventDefault()
		inputTarea.trim()
		if (inputTarea != '') {
			const nuevaTarea = {
				id: lista.length + 1,
				texto: inputTarea,
			}
			setLista([...lista, nuevaTarea]);
			setInputTarea('');
		}
	}
	function eliminarTarea(id) {
		const newLista = lista.filter(item => item.id !== id);
		setLista(newLista);
	};

	// function mostrarIcono() {
	// 	setMostrar('flex')
	// }

	useEffect(() => {
		login()
		traerTareas()
	}, [])

	return (
		<div className="d-flex flex-column align-items-center">
			<h1>todos</h1>
			<div className="d-flex flex-row">
				<input className='' type="text" onChange={handleTarea} value={inputTarea} />
				<button className="btn btn-primary" onClick={agregarTarea}>Agregar</button>
			</div>
			<div>
				<ul className="float-start">
					{lista.map((item, index) => (
						<li key={index} className="item-li d-flex flex-row fs-4 float-end">
							{item.label}
							<button className="btn btn-light" onClick={() => eliminarTarea(item.id)} style={{ fontSize: '10px' }}>X</button>
						</li>
					))}
				</ul>
			</div>
		</div >
	);
};

export default List;