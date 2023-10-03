"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const update_todo_by_id_1 = require("../../../../src/domain/usecases/todo/update_todo_by_id");
describe("Update Todo Use Case", () => {
    class MockTodoRepository {
        createTodo(todo) {
            throw new Error("Method not implemented.");
        }
        getAllTodos() {
            throw new Error("Method not implemented.");
        }
        getTodoById(id) {
            throw new Error("Method not implemented.");
        }
        updateTodoById(id, todo) {
            throw new Error("Method not implemented.");
        }
        deleteTodoById(id) {
            throw new Error("Method not implemented.");
        }
    }
    let mockTodoRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockTodoRepository = new MockTodoRepository();
    });
    test("Should return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const InputData = { title: "test", description: "test", isCompleted: false };
        const ExpectedResult = { id: 1, title: "test", description: "test", isCompleted: false };
        // should return 
        jest.spyOn(mockTodoRepository, "updateTodoById").mockImplementation(() => Promise.resolve(ExpectedResult));
        const updateTodoByIdUseCase = new update_todo_by_id_1.UpdateTodoById(mockTodoRepository);
        const result = yield updateTodoByIdUseCase.execute(1, InputData);
        expect(mockTodoRepository.updateTodoById).toBeCalledTimes(1);
    }));
});
