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
const get_all_todos_1 = require("../../../../src/domain/usecases/todo/get_all_todos");
describe("Get All Todos Use Case", () => {
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
    test("should return data", () => __awaiter(void 0, void 0, void 0, function* () {
        const ExpectedResult = [{ id: 1, title: "test", description: "test", isCompleted: false }];
        jest.spyOn(mockTodoRepository, "getAllTodos").mockImplementation(() => Promise.resolve(ExpectedResult));
        const getAllTodos = new get_all_todos_1.GetAllTodos(mockTodoRepository);
        const result = yield getAllTodos.execute();
        expect(result).toStrictEqual(ExpectedResult);
    }));
});
