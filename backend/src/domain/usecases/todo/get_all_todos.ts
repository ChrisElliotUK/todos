import { TodoResponseModel } from "../../models/todo";
import { TodoRepository } from '../../interfaces/repositories/todo_repository';
import { GetAllTodosUseCase } from '../../interfaces/usecases/get_all_todos_usecase';


export class GetAllTodos implements GetAllTodosUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(): Promise<TodoResponseModel[]> {
        const result = await this.todoRepository.getAllTodos()

        return result
    }
}