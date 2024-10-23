import { TodosProvider } from '../contexts/TodosContext';
import TodosContainer from './TodosContainer';

function App() {
  return (
    <TodosProvider>
      <TodosContainer />
    </TodosProvider>
  );
}

export default App;
