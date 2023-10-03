
import { TodoDataSource } from "../../../src/data/interfaces/data_sources/todo_data_source";
import { TodoRequestModel, TodoResponseModel } from "../../../src/domain/models/todo";
import { TodoRepository } from "../../../src/domain/interfaces/repositories/todo_repository";
import { TodoRepositoryImpl } from "../../../src/domain/repositories/todo_repository";

class MockTodoDataSource implements TodoDataSource {
    create(todo: TodoRequestModel): Promise<TodoResponseModel> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<TodoResponseModel[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<TodoResponseModel | null> {
        throw new Error("Method not implemented.");
    }
    updateById(id: number, todo: TodoRequestModel): Promise<TodoResponseModel> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

describe("Todo Repository", () => {
    let mockTodoDataSource: TodoDataSource;
    let todoRepository: TodoRepository

    beforeEach(() => {
        jest.clearAllMocks();
        mockTodoDataSource = new MockTodoDataSource()
        todoRepository = new TodoRepositoryImpl(mockTodoDataSource)
    })

    describe("getAllTodos", () => {
        test("should return data", async () => {
            const expectedData = [{ id: 1, title: "test", description: "test", isCompleted: false, }]
            jest.spyOn(mockTodoDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData))
            const result = await todoRepository.getAllTodos();
            expect(result).toBe(expectedData)
        });
    })

    describe("getTodoById", () => {
        test("should return data", async () => {
            const expectedData = { id: 1, title: "test", description: "test", isCompleted: false }
            jest.spyOn(mockTodoDataSource, "getById").mockImplementation(() => Promise.resolve(expectedData))
            const result = await todoRepository.getTodoById(expectedData.id);
            expect(result).toBe(expectedData)
        });
    })

    describe("createTodo", () => {
        test("should return data", async () => {
            const inputData = { id: 1, title: "test", description: "test", isCompleted: false }
            jest.spyOn(mockTodoDataSource, "create").mockImplementation(() => Promise.resolve(inputData))
            const result = await todoRepository.createTodo(inputData);
            expect(result).toBe(inputData)
        });
    })

    describe("updateTodoById", () => {
        test("should return data", async () => {
            const id = 1
            const inputData = { title: "Todo 1", description: "Description 1", isCompleted: false }
            const ExpectedData = { id: 1, title: "Todo 1", description: "Description 1", isCompleted: false }
            jest.spyOn(mockTodoDataSource, "updateById").mockImplementation(() => Promise.resolve(ExpectedData))
            todoRepository.updateTodoById(id, inputData);
            expect(mockTodoDataSource.updateById).toHaveBeenCalledWith(1, {
                title: "Todo 1", description: "Description 1", isCompleted: false
            })


        });
    })

    describe("deleteTodoById", () => {
        test("should return data", async () => {
            const inputData = { id: 1, title: "test", description: "test", isCompleted: false }
            jest.spyOn(mockTodoDataSource, "deleteById").mockImplementation(() => Promise.resolve(true))
            const result = await todoRepository.deleteTodoById(inputData.id);
            expect(result).toBe(true)
        });
    }

    )
})


