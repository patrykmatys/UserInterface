import React, { useEffect, useState } from 'react';
import { getObjects } from '../api/calls';

function TodoList() {
    const [todos, setTodos] = useState([]);
  
    useEffect(() => {
      async function fetchTodos() {
        try {
          const todosData = await getObjects();
          console.log(todosData)
          setTodos(todosData);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      }
      
      fetchTodos();
    }, []);
  
  
    return (
      <div>
        test
      </div>
    );
  }
  
  export default TodoList;