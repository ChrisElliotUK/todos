import { TodoRequestModel, TodoResponseModel } from '../../models/todo'

export interface TodoRepository {
    createTodo(todo: TodoRequestModel): Promise<TodoResponseModel>;
    getAllTodos(): Promise<TodoResponseModel[]>;
    getTodoById(id: number): Promise<TodoResponseModel | null>;
    updateTodoById(id: number, todo: TodoRequestModel): void;
    deleteTodoById(id: number): Promise<boolean>;
} 