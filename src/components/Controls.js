import { useTodos } from '../contexts/TodosContext';
import PrioritySelect from './PrioritySelect';

function Controls() {
  const {
    addTodoInputEl,
    searchTerm,
    handleSearchTodo,
    isFakeDark,
    setIsFakeDark,
  } = useTodos();
  console.log(addTodoInputEl);
  return (
    <div className="controls">
      <div className="newtodo-wrapper">
        <label>Enter a todo to add to the list: </label>
        <input ref={addTodoInputEl} type="text" name="todo" />
      </div>
      <PrioritySelect />
      <button
        onClick={() => setIsFakeDark(isFakeDark => !isFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? '☀️' : '🌙'}
      </button>
      <div className="search-wrapper">
        <input
          value={searchTerm}
          onChange={e => handleSearchTodo(e)}
          type="text"
          placeholder="Search todo..."
        />
        <span className="icon-magnifier">🔍</span>
      </div>
    </div>
  );
}

export default Controls;