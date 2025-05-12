export interface Todo {
    id: string | number; // Так как API позволяет использовать и строки, и числа
    text: string;
    completed: boolean;
}