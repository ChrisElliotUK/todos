
import { TodoRequestModel, TodoResponseModel } from "../../../../src/domain/models/todo";
import { TodoRepository } from "../../../../src/domain/interfaces/repositories/todo_repository";
import { GetTodoById } from '../../../../src/domain/usecases/todo/get_todo_by_id';

describe("Get Todo By Id Use Case", () => {

    class MockTodoRepository implements TodoRepository {

        createTodo(todo: TodoRequestModel): Promise<TodoResponseModel> {
            throw new Error("Method not implemented.");
        }
        getAllTodos(): Promise<TodoResponseModel[]> {
            throw new Error("Method not implemented.");
        }
        getTodoById(id: number): Promise<TodoResponseModel | null> {
            throw new Error("Method not implemented.");
        }
        updateTodoById(id: number, todo: TodoRequestModel): Promise<TodoResponseModel> {
            throw new Error("Method not implemented.");
        }
        deleteTodoById(id: number): Promise<boolean> {
            throw new Error("Method not implemented.");
        }

    }

    let mockTodoRepository: TodoRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockTodoRepository = new MockTodoRepository()
    })

    test("should return data", async () => {

        const ExpectedResult: TodoResponseModel = { id: 1, title: "test", description: "test", isCompleted: false }
        const InputData: number = 1

        jest.spyOn(mockTodoRepository, "getTodoById").mockImplementation(() => Promise.resolve(ExpectedResult))
        const getTodoByIdUseCase = new GetTodoById(mockTodoRepository)
        const result = await getTodoByIdUseCase.execute(InputData);
        expect(result).toStrictEqual(ExpectedResult)

    })
})