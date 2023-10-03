import { TodoDataSource } from "../../data/interfaces/data_sources/todo_data_source";
import { TodoRequestModel, TodoResponseModel } from "../models/todo";
import { TodoRepository } from "../interfaces/repositories/todo_repository";

export class TodoRepositoryImpl implements TodoRepository {
    todoDataSource: TodoDataSource
    constructor(todoDataSource: TodoDataSource) {
        this.todoDataSource = todoDataSource
    }

    async createTodo(todo: TodoRequestModel): Promise<TodoResponseModel> {
        const result = await this.todoDataSource.create(todo)
        return result;
    }

    async getAllTodos(): Promise<TodoResponseModel[]> {
        const result = await this.todoDataSource.getAll()
        return result;
    }

    async getTodoById(id: number): Promise<TodoResponseModel | null> {
        const result = await this.todoDataSource.getById(id)
        return result;
    }

    async updateTodoById(id: number, todo: TodoRequestModel) {
        await this.todoDataSource.updateById(id, todo)


    }

    async deleteTodoById(id: number): Promise<boolean> {
        const result = await this.todoDataSource.deleteById(id)
        return result;
    }

}
