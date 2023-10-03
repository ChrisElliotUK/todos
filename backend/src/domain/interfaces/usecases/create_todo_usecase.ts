import { TodoRequestModel, TodoResponseModel } from "../../models/todo";

export interface CreateTodoUseCase {


    execute(todo: TodoRequestModel): Promise<TodoResponseModel>;
}

