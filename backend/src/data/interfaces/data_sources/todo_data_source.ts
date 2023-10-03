
import { TodoRequestModel, TodoResponseModel } from "../../../domain/models/todo";

export interface TodoDataSource {
    create(todo: TodoRequestModel): Promise<TodoResponseModel>;
    getAll(): Promise<TodoResponseModel[]>;
    getById(id: number): Promise<TodoResponseModel | null>;
    updateById(id: number, todo: TodoRequestModel): void;
    deleteById(id: number): Promise<boolean>;
}
