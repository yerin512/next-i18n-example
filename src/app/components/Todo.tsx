'use client';

import { useState } from 'react';

interface TodoProps {
  t: (key: string) => string;
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC<TodoProps> = ({ t }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const todo: TodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>{t('todo.title')}</h2>
      
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder={t('todo.placeholder')}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>{t('todo.add')}</button>
      </div>
      
      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="empty-message">{t('todo.empty')}</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>×</button>
            </li>
          ))
        )}
      </ul>
      
      <style jsx>{`
        .todo-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }
        
        .todo-input {
          display: flex;
          margin-bottom: 20px;
        }
        
        .todo-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          font-size: 16px;
        }
        
        .todo-input button {
          padding: 10px 15px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          font-size: 16px;
        }
        
        .todo-list {
          list-style-type: none;
          padding: 0;
        }
        
        .todo-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .todo-list li span {
          cursor: pointer;
          flex: 1;
        }
        
        .todo-list li.completed span {
          text-decoration: line-through;
          color: #888;
        }
        
        .todo-list li button {
          background: none;
          border: none;
          color: #ff4d4d;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
        }
        
        .empty-message {
          text-align: center;
          color: #888;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default Todo; 