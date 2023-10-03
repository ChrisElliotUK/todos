
import { TodoRequestModel, TodoResponseModel } from "../../../../src/domain/models/todo";
import { TodoRepository } from "../../../../src/domain/interfaces/repositories/todo_repository";
import { DeleteTodoById } from '../../../../src/domain/usecases/todo/delete_todo_by_id';

describe("Delete Todo Use Case", () => {

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

    test("should return bool", async () => {

        const InputData: TodoResponseModel = { id: 1, title: "test", description: "test", isCompleted: false }

        jest.spyOn(mockTodoRepository, "deleteTodoById").mockImplementation(() => Promise.resolve(true))
        const deleteTodoUseCase = new DeleteTodoById(mockTodoRepository)
        const result = await deleteTodoUseCase.execute(InputData.id);
        expect(result).toStrictEqual(true)

    })
})