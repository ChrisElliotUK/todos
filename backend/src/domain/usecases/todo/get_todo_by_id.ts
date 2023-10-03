import { TodoResponseModel } from "../../models/todo";
import { TodoRepository } from '../../interfaces/repositories/todo_repository';
import { GetTodoByIdUseCase } from "../../interfaces/usecases/get_todo_by_id_usecase";

export class GetTodoById implements GetTodoByIdUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(id: number): Promise<TodoResponseModel | null> {
        const result = await this.todoRepository.getTodoById(id)

        return result
    }
}
