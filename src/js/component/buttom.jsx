import React, { useEffect, useState } from "react";

const Buttom = () => {
    const [todos, setTodos] = useState([]);
    
    const deleteAll = async (id) => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/juanpablo", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response === 204) {
                setTodos([]);
                console.log("Item eliminado:");
                
            } else {
                console.error("Error al borrar el item:", response.statusText);
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
        }
    };

    return (
        <div className="btn-group" role="group" aria-label="Basic example">

            <button type="button" className="btn btn-danger" onClick={deleteAll}>Eliminar todo</button>

        </div>
    );
};

export default Buttom;
