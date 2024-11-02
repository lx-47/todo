import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ fetchTodos }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:7000/api/todos/', { title });
            setTitle('');
            fetchTodos(); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-4">
            <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Add a To-do'
                required
                className="p-2 border rounded-md border-gray-300"
            />
            <button type='submit' className="bg-blue-500 text-white p-2 rounded-md">Add To-Do</button>
        </form>
    );
};

export default TodoForm;
