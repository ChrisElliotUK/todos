import { TodoRequestModel, TodoResponseModel } from "../../models/todo";

export interface UpdateTodoByIdUseCase {
    execute(id: number, todo: TodoRequestModel): void;
}

