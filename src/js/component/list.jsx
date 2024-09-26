import React, { useState } from "react";

//create your first component
const List = () => {
    const [inputValue, setInputValue] = useState("");
    const [itemsArray, setItemsArray] = useState([]);

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

    const deleteItem = (index) => {
        setItemsArray(itemsArray.filter((_, i) => i !== index));
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
                {itemsArray.map((item, index) => (
                    <li key={index} className="item list-group-item d-flex justify-content-between align-items-center">
                        {item.label}
                        <button className="btn btn-sm delete-button" onClick={() => deleteItem(index)}>
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