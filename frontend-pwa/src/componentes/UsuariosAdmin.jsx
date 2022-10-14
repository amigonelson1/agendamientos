import React, {useState, Fragment, useRef, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';

const KEY = 'Tareas.todos';
  
export function UsuariosAdmin(){

    const [todos, setTodos] = useState([]);

    const todoTaskRef= useRef();

    useEffect(()=>{
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos){
            setTodos(storedTodos);
        }
    }, [] 
    );

    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]
    );

    var toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task==='') return;

        setTodos((prevTodos)=>{
            return[...prevTodos, {id:uuidv4(), task, completed:false}]
        });

        todoTaskRef.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) =>!todo.completed);
        setTodos(newTodos);
    };

    return(
        <Fragment>
            <Lista todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type='text' placeholder='Ingresa nueva profesión o área'></input>
            <button onClick={handleTodoAdd}>agregar</button>
            <button onClick={handleClearAll}>eliminar</button>
            <div>
                Se han creado {todos.length} Profesiones o áreas.
            </div>
            <div>
                Selecciono {todos.filter((todo)=>todo.completed).length} items, de click en eliminar para quitar de lista.
            </div>
        </Fragment>
    );
        
}


function Lista({todos, toggleTodo}) {
    return (
        <ul>
         {
             todos.map((todo) => (
                 <Listado key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
             ))
         }  
        </ul>
    );
}


function Listado ({todo, toggleTodo}){
    const handleTodoClick = () => {
        toggleTodo(id);
    }

    const {id, task, completed} = todo;
    
    return(
    <li>
        <input type='checkbox' checked={completed} onClick={handleTodoClick} /> 
        {task}
    </li>
    );
}