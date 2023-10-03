import { TodoRequestModel, TodoResponseModel } from "../../models/todo";
import { TodoRepository } from '../../interfaces/repositories/todo_repository';
import { UpdateTodoByIdUseCase } from "../../interfaces/usecases/update_todo_by_id_usecase";

export class UpdateTodoById implements UpdateTodoByIdUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(id: number, todo: TodoRequestModel) {
        this.todoRepository.updateTodoById(id, todo);
    }
}