import { useTodos } from '../contexts/TodosContext';
import TodoItem from './TodoItem';

function TodosList() {
  const { todos, setTodos } = useTodos(); // Access todos and setTodos to update the order

  // Handle drop and reorder todos
  const handleDrop = (draggedId, droppedId) => {
    const draggedTodoIndex = todos.findIndex(
      todo => todo.id === parseInt(draggedId)
    );
    const droppedTodoIndex = todos.findIndex(
      todo => todo.id === parseInt(droppedId)
    );

    if (draggedTodoIndex === droppedTodoIndex) return; // If same position, no need to reorder

    const updatedTodos = [...todos];
    const [draggedTodo] = updatedTodos.splice(draggedTodoIndex, 1); // Remove the dragged todo
    updatedTodos.splice(droppedTodoIndex, 0, draggedTodo); // Insert it at the new position

    setTodos(updatedTodos); // Update the state with the new order
  };

  return (
    <ul className="todos-container">
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <TodoItem
            todo={todo}
            index={index}
            key={todo.id} // Use the todo id as the key
            handleDrop={handleDrop} // Pass handleDrop to TodoItem
          />
        ))
      ) : (
        <p className="fallback">
          <strong>
            There are no todos in your list, start by adding a todo today!
          </strong>
        </p>
      )}
    </ul>
  );
}

export default TodosList;
