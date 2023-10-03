import { TodoResponseModel } from "../../models/todo";

export interface GetAllTodosUseCase {
    execute(): Promise<TodoResponseModel[]>;
}


