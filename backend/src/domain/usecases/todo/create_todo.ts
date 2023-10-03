import { TodoRequestModel, TodoResponseModel } from "../../models/todo";
import { CreateTodoUseCase } from '../../interfaces/usecases/create_todo_usecase';
import { TodoRepository } from '../../interfaces/repositories/todo_repository';

export class CreateTodo implements CreateTodoUseCase {
    todoRepository: TodoRepository
    constructor(todoRepository: TodoRepository) {
        this.todoRepository = todoRepository
    }

    async execute(todo: TodoRequestModel): Promise<TodoResponseModel> {
        const result = await this.todoRepository.createTodo(todo)

        return result
    }
}
