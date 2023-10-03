import { TodoResponseModel } from "../../models/todo";

export interface GetTodoByIdUseCase {
    execute(id: number): Promise<TodoResponseModel | null>;
}

