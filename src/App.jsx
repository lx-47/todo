import React from "react"
import {useSelector, useDispatch} from 'react-redux'
import {increment, decrement} from './Redux/slices'
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
function App() {
  const value =  useSelector((state) => state.example.value)
  const dispatch = useDispatch()
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/TodoTodoTodo' element={<TodoForm/>} />
      <Route path='/' element={<TodoList/>} />  
    </Routes>
    </BrowserRouter>
  )
}

export default App
