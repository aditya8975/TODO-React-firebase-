// App.js
import React, { useState, useEffect } from 'react';
import db from './firebase';
import TodoList from './TodoList';
import AddTodo from './AddTodo';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('todos').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(data);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = (text) => {
    db.collection('todos').add({
      text,
      completed: false
    });
  };

  const toggleComplete = (id) => {
    db.collection('todos').doc(id).update({
      completed: !todos.find(todo => todo.id === id).completed
    });
  };

  const deleteTodo = (id) => {
    db.collection('todos').doc(id).delete();
  };

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
