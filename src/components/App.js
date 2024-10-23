import { Toaster } from 'react-hot-toast';
import { TodosProvider } from '../contexts/TodosContext';
import TodosContainer from './TodosContainer';

function App() {
  return (
    <TodosProvider>
      <TodosContainer />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 1700,
            style: {
              backgroundColor: '#048e1bcc',
            },
          },
          error: {
            duration: 1700,
            style: {
              backgroundColor: '#fb2727bd',
            },
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            // opacity: 0.8,
            color: '#fff',
          },
        }}
      />
    </TodosProvider>
  );
}

export default App;
