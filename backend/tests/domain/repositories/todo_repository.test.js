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
const todo_repository_1 = require("../../../src/domain/repositories/todo_repository");
class MockTodoDataSource {
    create(todo) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
    getById(id) {
        throw new Error("Method not implemented.");
    }
    updateById(id, todo) {
        throw new Error("Method not implemented.");
    }
    deleteById(id) {
        throw new Error("Method not implemented.");
    }
}
describe("Todo Repository", () => {
    let mockTodoDataSource;
    let todoRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockTodoDataSource = new MockTodoDataSource();
        todoRepository = new todo_repository_1.TodoRepositoryImpl(mockTodoDataSource);
    });
    describe("getAllTodos", () => {
        test("should return data", () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedData = [{ id: 1, title: "test", description: "test", isCompleted: false, }];
            jest.spyOn(mockTodoDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData));
            const result = yield todoRepository.getAllTodos();
            expect(result).toBe(expectedData);
        }));
    });
    describe("getTodoById", () => {
        test("should return data", () => __awaiter(void 0, void 0, void 0, function* () {
            const expectedData = { id: 1, title: "test", description: "test", isCompleted: false };
            jest.spyOn(mockTodoDataSource, "getById").mockImplementation(() => Promise.resolve(expectedData));
            const result = yield todoRepository.getTodoById(expectedData.id);
            expect(result).toBe(expectedData);
        }));
    });
    describe("createTodo", () => {
        test("should return data", () => __awaiter(void 0, void 0, void 0, function* () {
            const inputData = { id: 1, title: "test", description: "test", isCompleted: false };
            jest.spyOn(mockTodoDataSource, "create").mockImplementation(() => Promise.resolve(inputData));
            const result = yield todoRepository.createTodo(inputData);
            expect(result).toBe(inputData);
        }));
    });
    describe("updateTodoById", () => {
        test("should return data", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = 1;
            const inputData = { title: "Todo 1", description: "Description 1", isCompleted: false };
            const ExpectedData = { id: 1, title: "Todo 1", description: "Description 1", isCompleted: false };
            jest.spyOn(mockTodoDataSource, "updateById").mockImplementation(() => Promise.resolve(ExpectedData));
            todoRepository.updateTodoById(id, inputData);
            expect(mockTodoDataSource.updateById).toHaveBeenCalledWith(1, {
                title: "Todo 1", description: "Description 1", isCompleted: false
            });
        }));
    });
    describe("deleteTodoById", () => {
        test("should return data", () => __awaiter(void 0, void 0, void 0, function* () {
            const inputData = { id: 1, title: "test", description: "test", isCompleted: false };
            jest.spyOn(mockTodoDataSource, "deleteById").mockImplementation(() => Promise.resolve(true));
            const result = yield todoRepository.deleteTodoById(inputData.id);
            expect(result).toBe(true);
        }));
    });
});
