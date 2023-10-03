
import { TodoRepository } from "../../../../src/domain/interfaces/repositories/todo_repository";
import { TodoRequestModel, TodoResponseModel } from "../../../../src/domain/models/todo";
import { UpdateTodoById } from '../../../../src/domain/usecases/todo/update_todo_by_id';

describe("Update Todo Use Case", () => {

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

    test("Should return data", async () => {


        const InputData: TodoRequestModel = { title: "test", description: "test", isCompleted: false }
        const ExpectedResult: TodoResponseModel = { id: 1, title: "test", description: "test", isCompleted: false }
        // should return 
        jest.spyOn(mockTodoRepository, "updateTodoById").mockImplementation(() => Promise.resolve(ExpectedResult))
        const updateTodoByIdUseCase = new UpdateTodoById(mockTodoRepository)
        const result = await updateTodoByIdUseCase.execute(1, InputData);
        expect(mockTodoRepository.updateTodoById).toBeCalledTimes(1)

    })
})