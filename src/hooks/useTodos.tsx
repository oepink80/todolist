import { useState, useEffect } from 'react';
import { getTodos, addTodo as apiAddTodo, updateTodo, deleteTodo as apiDeleteTodo } from '../api/todosApi';

// Интерфейс для описания одного элемента ToDo
interface Todo {
  id: number | string;
  text: string;
  completed: boolean;
}

// Хук для управления состоянием списка ToDos
export function useTodos(): {
  todos: Todo[],
  addTodo: (text: string) => Promise<void>,
  toggleTodo: (id: string| number ) => Promise<void>,
  deleteTodo: (id: string | number ) => Promise<void>,
  loading: boolean,
  error?: Error | null
} {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Получение начальных данных
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data); // Предполагается, что API возвращает массив объектов Todo
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); // Запускаем один раз при монтировании компонента

  // Создание новой задачи
  const addTodo = async (text: string) => {
    try {
      const newTodo = await apiAddTodo(text); // Возвращает объект Todo
      setTodos(prevTodos => [...prevTodos, newTodo]); // Добавляем новую запись в конец списка
    } catch (err) {
      setError(err as Error);
    }
  };

  // Переключение статуса задачи (завершенность)
  const toggleTodo = async (id: string | number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id)!; // Найти нужный todo
      const updatedTodo = await updateTodo(id, {
        completed: !todoToUpdate.completed
      }); // Меняем статус на противоположный

      setTodos(prevTodos =>
          prevTodos.map(todo =>
              todo.id === id ? updatedTodo : todo
          )
      ); // Обновляем конкретный todo
    } catch (err) {
      console.log(err);
      setError(err as Error);
    }
  };

  // Удаление задачи
  const deleteTodo = async (id: string| number) => {
    try {
      await apiDeleteTodo(id); // Отправляем запрос на удаление
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id)); // Фильтруем удалённый todo
    } catch (err) {
      setError(err as Error);
    }
  };

  return { todos, addTodo, toggleTodo, deleteTodo, loading, error };
}
