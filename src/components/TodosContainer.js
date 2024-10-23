import ButtonsGroup from './ButtonsGroup';
import Controls from './Controls';
import TodosList from './TodosList';

function TodosContainer() {
  return (
    <main className="main-container">
      <Controls />
      <TodosList />
      <ButtonsGroup />
    </main>
  );
}

export default TodosContainer;
