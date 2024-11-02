import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:7000/api/todos/');
            setTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleCompletion = async (todo) => {
        try {
            await axios.patch(`http://127.0.0.1:7000/api/todos/${todo.id}/`, { ...todo, completed: !todo.completed });
            const updatedTodos = todos.map((t) => 
                t.id === todo.id ? {...t, completed: !t.completed} :t
            )
            setTodos(updatedTodos)
        } catch (error) {
            console.error(error);
            fetchTodos();
        }
    };

    const handleEdit = (todo) => {
        setEditingTodo(todo);
        setEditTitle(todo.title);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editTitle) return;
        try {
            await axios.patch(`http://127.0.0.1:7000/api/todos/${editingTodo.id}/`, { ...editingTodo, title: editTitle });
            fetchTodos();
            setEditingTodo(null);
            setEditTitle('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !==id )
        setTodos(updatedTodos)
        try {
            await axios.delete(`http://127.0.0.1:7000/api/todos/${id}/`);
        } catch (error) {
            console.error(error);
            fetchTodos();
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">Todo List</h1>
            <div className="space-y-4">
                {todos.map((todo) => (
                    <div key={todo.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                        <span className="flex items-center">
                            <input 
                                type="checkbox" 
                                checked={todo.completed} 
                                onChange={() => toggleCompletion(todo)} 
                                className="mr-4 cursor-pointer"
                            />
                            {editingTodo && editingTodo.id === todo.id ? (
                                <form onSubmit={handleUpdate} className="flex items-center">
                                    <input 
                                        type="text" 
                                        value={editTitle} 
                                        onChange={(e) => setEditTitle(e.target.value)} 
                                        className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-300" 
                                    />
                                    <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">Update</button>
                                </form>
                            ) : (
                                <span className={`text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{todo.title}</span>
                            )}
                        </span>
                        <div>
                            <button onClick={() => handleEdit(todo)} className="text-blue-500 hover:underline mr-4">Edit</button>
                            <button onClick={() => handleDelete(todo.id)} className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6">
                <TodoForm fetchTodos={fetchTodos} />
            </div>  
        </div>
    );
};

export default TodoList;
