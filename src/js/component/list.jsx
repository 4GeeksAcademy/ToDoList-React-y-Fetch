import React, { useEffect,useState } from "react";

//create your first component
const List = () => {
    const [inputValue, setInputValue] = useState("");
    const [itemsArray, setItemsArray] = useState([]);
    const [todos, setTodos] = useState([]);

	useEffect(() => {
		console.log("Cargando componente...");
		initializeList();
	}, []);

	async function initializeList() {
		let resp = await fetch("https://playground.4geeks.com/todo/users/juanpablo", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		});

		if (resp.status == 404) {
			let respCreate = await fetch("https://playground.4geeks.com/todo/users/juanpablo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				}
			});
		}
		if (resp.status == 201) {
			let data = await resp.json();
			console.log({ data });
			setTodos(data.todos);
		}
	}

    const addArray = async (e) => {
        if (e.key === "Enter") {
            if (inputValue.trim()) {
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
                        setItemsArray([...itemsArray, data]);
                        setInputValue("");
                    } else {
                        console.error("Error al agregar el item:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en la conexión:", error);
                }
            }
        }
    };

    function deleteItem (id) {
        console.log(id)
        try {
            const response = fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
            //useEffect 
                console.log(response)
                return response
                
            } else {
                console.error("Error al borrar el item:", response.statusText);
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
                {todos.map((item, index) => (
                    <li key={index} className="item list-group-item d-flex justify-content-between align-items-center">
                        {item.label}
                        <button className="btn btn-sm delete-button" onClick={() => deleteItem(item.id)}>
                            X
                        </button>
                    </li>
                    ))}
                <li className="count list-group-item text-start">{itemsArray.length} items left</li>
            </ul>
        </div>
    );
};

export default List;