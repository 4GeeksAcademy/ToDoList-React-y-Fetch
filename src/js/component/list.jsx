import React, { useEffect, useState } from "react";

const List = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        console.log("Cargando componente...");
        initializeList();
    }, []);

    async function initializeList() {
        try {
            let resp = await fetch("https://playground.4geeks.com/todo/users/juanpablo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            if (resp.status === 404) {
                // Si no existe, se crea un nuevo recurso
                await fetch("https://playground.4geeks.com/todo/users/juanpablo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                // Llamar de nuevo a initializeList para obtener los datos
                return initializeList();
            }
    
            if (resp.ok) { // Cambié a resp.ok para manejar cualquier respuesta 200-299
                let data = await resp.json();
                console.log("Usuario Creado");
                setTodos(data.todos);
            } else {
                console.error('Error al obtener la lista:', resp.status);
            }
        } catch (error) {
            console.error('Error en la red:', error);
        }
    }

    const addArray = async (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            const newItem = { label: inputValue };

            try {
                const response = await fetch("https://playground.4geeks.com/todo/todos/juanpablo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newItem),
                });
                if (response.ok) {
                    const data = await response.json();
                    setTodos([...todos, data]);
                    setInputValue("");
                } else {
                    console.error("Error al agregar el item:", response.statusText);
                }
            } catch (error) {
                console.error("Error en la conexión:", error);
            }
        }
    };

    const deleteItem = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                setTodos(todos.filter(item => item.id !== id));
                console.log("Item eliminado:", id);
            } else {
                console.error("Error al borrar el item:", response.statusText);
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
        }
    };

    const deleteAll = async () => {
        try {
            const deleteResponse = await fetch("https://playground.4geeks.com/todo/users/juanpablo", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            if (deleteResponse.ok) {
                console.log("Items eliminados:");
                await fetch("https://playground.4geeks.com/todo/users/juanpablo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                setTodos([]);
        
            } else {
                console.error("Error al borrar el item:", deleteResponse.statusText);
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
        }
    };


    return (
        <div className="container w-50 justify-content-center">
            <ul className="list-group border-none">
                <li className="list-group-item">
                    <input
                        type="text" 
                        value={inputValue} 
                        onKeyDown={addArray} 
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </li>
                {todos.map((item) => (
                    <li key={item.id} className="item list-group-item d-flex justify-content-between align-items-center">
                        {item.label}
                        <button className="btn btn-sm delete-button" onClick={() => deleteItem(item.id)}>
                            X
                        </button>
                    </li>
                ))}
                <li className="count list-group-item text-start">{todos.length} items left</li>
            </ul>
            <div className="btn-group" role="group" aria-label="Basic example">

                <button type="button" className="btn btn-danger" onClick={deleteAll}>Eliminar todo</button>

            </div>
        </div>
    );
};

export default List;
