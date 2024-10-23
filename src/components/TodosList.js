import { useTodos } from '../contexts/TodosContext';
import TodoItem from './TodoItem';

function TodosList() {
  const { todos } = useTodos();
  return (
    <ul className="todos-container">
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <TodoItem todo={todo} index={index} key={index} />
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
