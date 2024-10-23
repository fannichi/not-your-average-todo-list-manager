import { useTodos } from '../contexts/TodosContext';

function PrioritySelect() {
  const { difficulty, setDifficulty } = useTodos();
  return (
    <div className="newtodo-wrapper">
      <label>Select Priority : </label>
      <select
        value={difficulty}
        onChange={e => setDifficulty(e.target.value)}
        className="priority-select"
      >
        <option>Select option (medium is default)</option>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>
    </div>
  );
}

export default PrioritySelect;
