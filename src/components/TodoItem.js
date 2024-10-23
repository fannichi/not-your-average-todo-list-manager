import { useTodos } from '../contexts/TodosContext';

function TodoItem({ todo, index }) {
  const {
    handleSelectTodo,
    handleDelete,
    selectedTodo,
    setIsEditing,
    isEditing,
    handleUpdateTodo,
  } = useTodos();
  return (
    <div className="items-container">
      <span className={`priority ${todo.priority}`}>
        {todo.priority[0].toUpperCase()}
      </span>
      <li
        className={`todo-item ${
          selectedTodo?.id === todo.id ? 'selected' : ''
        }`}
        onClick={() => {
          handleSelectTodo(todo);
          setIsEditing(false);
        }}
      >
        {isEditing && selectedTodo?.id === todo.id ? (
          <input
            type="text"
            defaultValue={todo.title}
            placeholder="updated todo..."
            onClick={e => {
              e.stopPropagation();
            }}
            onBlur={e => {
              setIsEditing(false);
              handleUpdateTodo(todo, e.target.value);
            }}
            onKeyDown={e => {
              if (e.key.toLowerCase() === 'enter') {
                handleUpdateTodo(todo, e.target.value);
                setIsEditing(false);
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
          <button
            className="btn-edit"
            onClick={e => {
              e.stopPropagation();
              setIsEditing(true);
              handleSelectTodo(todo);
            }}
          >
            ✏️
          </button>
          <button
            className="btn-delete"
            onClick={e => {
              e.stopPropagation();
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
