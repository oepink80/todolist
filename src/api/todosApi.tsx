// В реальном приложении здесь были бы настоящие API вызовы
// Для тестов мы замораживаем этот модуль с помощью MSW
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

let todos: TodoItem[] = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Write tests', completed: false },
];

const simulateNetworkDelay = () =>
    new Promise<void>(resolve => setTimeout(resolve, 100));

export const getTodos = async (): Promise<TodoItem[]> => {
  await simulateNetworkDelay();
  // const response = await fetch('/todos'); // отправляем GET-запрос на /todos
  // if (!response.ok) throw new Error(`Failed to load todos: ${response.status}`);
  // console.log('fetching...');
  // console.log(response);
  // return await response.json(); // парсим JSON-ответ
  return [...todos];
};

export const addTodo = async (text: string): Promise<TodoItem> => {
  await simulateNetworkDelay();
  const newTodo: TodoItem = {
    id: Date.now(),
    text,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

interface UpdateData {
  text?: string;
  completed?: boolean;
}

export const updateTodo = async (
    id: string | number,
    updates: UpdateData
): Promise<TodoItem> => {
  await simulateNetworkDelay();
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) throw new Error('Todo not found');
  todos[index] = { ...todos[index], ...updates };
  return todos[index];
};

export const deleteTodo = async (id: string | number): Promise<void> => {
  await simulateNetworkDelay();
  todos = todos.filter(todo => todo.id !== id);
};
