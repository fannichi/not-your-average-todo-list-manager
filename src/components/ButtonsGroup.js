import toast from 'react-hot-toast';
import { useTodos } from '../contexts/TodosContext';

function ButtonsGroup() {
  const {
    selectedTodo,
    handleAddTodo,
    handleUpdateTodo,
    toggleComplete,
    handleClearTodos,
    sortType,
    setSortType,
    searchedTodos,
    addTodoInputEl,
    setSelectedTodo,
  } = useTodos();

  const countTodos = searchedTodos.length;
  const completedTodos = searchedTodos.filter(
    todo => todo.completed === true
  ).length;
  const percentCompleted =
    completedTodos > 0 ? Math.ceil((completedTodos / countTodos) * 100) : 0;

  return (
    <>
      <div className="select">
        {countTodos > 0 && (
          <>
            <span>
              {percentCompleted === 100
                ? 'You completed all your todos! good job!'
                : `You have ${countTodos} todos and completed ${completedTodos} (${percentCompleted}%)`}
            </span>

            <div>
              <span>sort by: </span>
              <select
                value={sortType || 'select'}
                onChange={e => setSortType(e.target.value)}
                className="sort-select"
              >
                <option>Select option</option>
                <option value="lth">Priority low to high</option>
                <option value="htl">Priority high to low</option>
                <option value="nto">new to old</option>
                <option value="otn">old to new</option>
                <option value="completed">completed first</option>
                <option value="incomplete">incomplete first</option>
              </select>
            </div>
          </>
        )}
      </div>
      <div>
        <button className="btn-control" onClick={handleAddTodo}>
          ➕ add
        </button>
        <button
          className="btn-control"
          onClick={() => {
            !selectedTodo
              ? toast.error(`Select a todo from the list first!`)
              : handleUpdateTodo(selectedTodo, addTodoInputEl.current.value);
          }}
        >
          🔦 update
        </button>
        <button
          className="btn-control"
          onClick={() => {
            selectedTodo
              ? toggleComplete(selectedTodo)
              : toast.error('Select a todo to complete first!');
            setSelectedTodo(null);
          }}
        >
          {selectedTodo?.completed === true ? '⬅️ incomplete' : '✔️ complete'}
        </button>
        <button className="clear-btn btn-control" onClick={handleClearTodos}>
          ❌ Clear
        </button>
      </div>
    </>
  );
}

export default ButtonsGroup;
