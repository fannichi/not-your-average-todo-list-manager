import { useTodos } from '../contexts/TodosContext';

function TodoItem({ todo, index, handleDrop }) {
  const {
    handleSelectTodo,
    handleDelete,
    selectedTodo,
    setIsEditing,
    isEditing,
    handleUpdateTodo,
  } = useTodos();

  // Edit button click handler with stopPropagation
  const handleEditClick = (e, todo) => {
    e.stopPropagation(); // Prevent event bubbling to the li
    handleSelectTodo(todo); // Ensure the todo is selected first
    setIsEditing(true); // Now set it to editing mode
  };

  // List item click handler
  const handleLiClick = todo => {
    if (!isEditing) {
      handleSelectTodo(todo);
    }
  };

  // Handle drag start
  const handleDragStart = e => {
    e.dataTransfer.setData('draggedId', todo.id); // Set the dragged item ID
  };

  // Handle drop
  const handleDragOver = e => {
    e.preventDefault(); // Allow dropping
  };

  const handleDropOnItem = e => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('draggedId'); // Get the dragged item ID
    handleDrop(draggedId, todo.id); // Call the handleDrop function from TodosList to reorder
  };

  return (
    <div
      className="items-container"
      draggable="true"
      onDragStart={handleDragStart} // Start dragging
      onDragOver={handleDragOver} // Allow dragover event
      onDrop={handleDropOnItem} // Handle the drop
    >
      <span className={`priority ${todo.priority}`}>
        {todo.priority[0].toUpperCase()}
      </span>
      <li
        className={`todo-item ${
          selectedTodo?.id === todo.id ? 'selected' : ''
        }`}
        onClick={() => handleLiClick(todo)}
      >
        {isEditing && selectedTodo?.id === todo.id ? (
          <input
            type="text"
            defaultValue={todo.title}
            placeholder="updated todo..."
            onClick={e => e.stopPropagation()} // Prevent input from firing li click
            onBlur={e => {
              setIsEditing(false);
              handleUpdateTodo(todo, e.target.value);
            }}
            onKeyDown={e => {
              if (e.key.toLowerCase() === 'enter') {
                handleUpdateTodo(todo, e.target.value);
              }
            }}
          />
        ) : (
          <span className={todo.completed ? 'completed' : ''}>
            {todo.completed && '✅ '}
            {index + 1} - {todo.title}
          </span>
        )}
        <div>
          <button className="btn-edit" onClick={e => handleEditClick(e, todo)}>
            ✏️
          </button>
          <button
            className="btn-delete"
            onClick={e => {
              e.stopPropagation(); // Prevent delete button from firing li click
              handleDelete(todo.id);
            }}
          >
            &times;
          </button>
        </div>
      </li>
    </div>
  );
}

export default TodoItem;
