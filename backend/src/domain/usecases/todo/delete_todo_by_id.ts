import { TodoRepository } from '../../interfaces/repositories/todo_repository';
import { DeleteTodoByIdUseCase } from '../../interfaces/usecases/delete_todo_by_id_usecase';

export class DeleteTodoById implements DeleteTodoByIdUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(id: number): Promise<boolean> {
        const result = await this.todoRepository.deleteTodoById(id)

        return result
    }
}