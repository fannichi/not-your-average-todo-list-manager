import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocalStorageForTodos } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const initialTodosState = [
  {
    completed: false,
    id: 1,
    title: 'sample Todo 1',
    added: 99999,
    priority: 'medium',
  },
  {
    completed: false,
    id: 2,
    title: 'sample Todo 2',
    added: 9999999,
    priority: 'low',
  },
  {
    completed: false,
    id: 3,
    title: 'sample Todo 3',
    added: 99999999,
    priority: 'high',
  },
];

const TodosContext = createContext();

function TodosProvider({ children }) {
  const [todos, setTodos] = useLocalStorageForTodos(initialTodosState, 'todos');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isFakeDark, setIsFakeDark] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const addTodoInputEl = useRef(null);

  const handleDelete = useCallback(
    function (id) {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos, setTodos]
  );

  const handleAddTodo = useCallback(
    function () {
      const newTodo = {
        id: todos.length + 1,
        title: addTodoInputEl.current.value,
        completed: false,
        priority: ['LOW', 'MEDIUM', 'HIGH'].includes(difficulty)
          ? difficulty
          : 'medium',
        added: Date.now(),
      };
      const isExist = todos.some(todo => todo.title === newTodo.title);

      !addTodoInputEl.current.value
        ? alert(`Type in a todo to add to the list first!`)
        : !isExist
        ? setTodos([...todos, newTodo])
        : alert(`"${newTodo.title}" already exists`);
      addTodoInputEl.current.value = '';
      setDifficulty('');
      toast.success("Todo Added! let's get it done! 🚀");
    },
    [todos, setTodos, difficulty]
  );

  const handleClearTodos = useCallback(
    function () {
      setTodos([]);
      toast.success("Todos Cleared! you're all caught up! 🧹");
    },
    [setTodos]
  );

  const handleSelectTodo = useCallback(function (item) {
    setSelectedTodo(curTodo => {
      if (curTodo?.id === item.id) {
        addTodoInputEl.current.value = '';
        return null;
      } else {
        addTodoInputEl.current.value = item.title;
        return item;
      }
    });
  }, []);

  const handleUpdateTodo = useCallback(
    function (todo, el) {
      const currentTodo = todos?.find(curTodo => curTodo.id === todo.id);
      const updatedTodo = {
        ...currentTodo,
        title: el,
      };

      if (!el) {
        alert(`Type in the updated todo name!`);
        return;
      }

      setTodos(
        todos?.map(curTodo => (curTodo.id === todo.id ? updatedTodo : curTodo))
      );
      toast.success('Todo Updated! 🥳');
      setSelectedTodo(null);
    },
    [todos, setTodos]
  );

  const toggleComplete = useCallback(
    function (item) {
      setTodos(
        todos?.map(todo =>
          todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      setSelectedTodo({ ...item, completed: !item.completed });
      addTodoInputEl.current.value = '';
      toast.success("Todo's completed! keep going 💪");
    },
    [todos, setTodos]
  );

  function handleSearchTodo(e) {
    setSearchTerm(e.target.value);
  }

  // used for filtering
  const searchedTodos =
    searchTerm.length > 0
      ? todos.filter(todo =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : todos;

  // Sorting
  const priorityMap = { low: 1, medium: 2, high: 3 };

  if (sortType === 'lth')
    searchedTodos.sort(
      (a, b) =>
        priorityMap[a.priority.toLowerCase()] -
        priorityMap[b.priority.toLowerCase()]
    );
  if (sortType === 'htl')
    searchedTodos.sort(
      (a, b) =>
        priorityMap[b.priority.toLowerCase()] -
        priorityMap[a.priority.toLowerCase()]
    );
  if (sortType === 'otn') searchedTodos.sort((a, b) => a.added - b.added);
  if (sortType === 'nto') searchedTodos.sort((a, b) => b.added - a.added);

  // Fake dark mode
  useEffect(() => {
    document.body.classList.toggle('fake-dark-mode');
  }, [isFakeDark]);

  const value = useMemo(() => {
    return {
      selectedTodo,
      handleDelete,
      handleAddTodo,
      handleClearTodos,
      handleSelectTodo,
      handleUpdateTodo,
      toggleComplete,
      handleSearchTodo,
      addTodoInputEl,
      searchedTodos,
      searchTerm,
      setSearchTerm,
      todos: searchedTodos,
      sortType,
      setSortType,
      difficulty,
      setDifficulty,
      isFakeDark,
      setIsFakeDark,
      isEditing,
      setIsEditing,
      setSelectedTodo,
    };
  }, [
    selectedTodo,
    handleDelete,
    handleAddTodo,
    handleClearTodos,
    handleSelectTodo,
    handleUpdateTodo,
    toggleComplete,
    addTodoInputEl,
    searchedTodos,
    searchTerm,
    sortType,
    difficulty,
    isFakeDark,
    isEditing,
  ]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodosContext);
  if (context === undefined)
    throw new Error('useTodos must be used within a TodosProvider');
  return context;
}

export { TodosProvider, useTodos };
