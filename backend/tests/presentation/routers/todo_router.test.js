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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const todo_router_1 = __importDefault(require("../../../src/presentation/routers/todo_router"));
const server_1 = __importDefault(require("../../../src/server"));
class MockCreateTodoUseCase {
    execute(todo) {
        throw new Error("Method not implemented.");
    }
}
class MockDeleteTodoByIdUseCase {
    execute(id) {
        throw new Error("Method not implemented.");
    }
}
class MockGetAllTodosUseCase {
    execute() {
        throw new Error("Method not implemented.");
    }
}
class MockGetTodoByIdUseCase {
    execute(id) {
        throw new Error("Method not implemented.");
    }
}
class MockUpdateTodoByIdUseCase {
    execute(id, todo) {
        throw new Error("Method not implemented.");
    }
}
describe('Todo Router', () => {
    let mockCreateTodoUseCase;
    let mockDeleteTodoByIdUseCase;
    let mockGetAllTodosUseCase;
    let mockGetTodoByIdUseCase;
    let mockUpdateTodoByIdUseCase;
    beforeAll(() => {
        mockCreateTodoUseCase = new MockCreateTodoUseCase();
        mockDeleteTodoByIdUseCase = new MockDeleteTodoByIdUseCase();
        mockGetAllTodosUseCase = new MockGetAllTodosUseCase();
        mockGetTodoByIdUseCase = new MockGetTodoByIdUseCase();
        mockUpdateTodoByIdUseCase = new MockUpdateTodoByIdUseCase();
        server_1.default.use("/todo", (0, todo_router_1.default)(mockCreateTodoUseCase, mockGetAllTodosUseCase, mockGetTodoByIdUseCase, mockUpdateTodoByIdUseCase, mockDeleteTodoByIdUseCase));
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("GET /todo", () => {
        test("should return 200 with data", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = [{ id: 1, title: "Todo 1", description: "Description 1", isCompleted: false }];
            jest.spyOn(mockGetAllTodosUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData));
            const response = yield (0, supertest_1.default)(server_1.default).get("/todo");
            expect(response.status).toBe(200);
            expect(mockGetAllTodosUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        }));
        test("GET /todo returns 500 on use case error", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockGetAllTodosUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).get("/todo");
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error fetching data" });
        }));
    });
    describe("GET /todo/:id", () => {
        test("should return 200 with data", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = { id: 1, title: "Todo 1", description: "Description 1", isCompleted: false };
            jest.spyOn(mockGetTodoByIdUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData));
            const response = yield (0, supertest_1.default)(server_1.default).get("/todo/1");
            expect(response.status).toBe(200);
            expect(mockGetTodoByIdUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        }));
        test("GET /todo returns 500 on use case error", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockGetTodoByIdUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).get("/todo/1");
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error fetching data" });
        }));
    });
    describe("POST /todo", () => {
        test("should return 201 with data", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = { id: 1, title: "Todo 1", description: "Description 1", isCompleted: false };
            jest.spyOn(mockCreateTodoUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData));
            const response = yield (0, supertest_1.default)(server_1.default).post("/todo").send({ title: "Todo 1", description: "Description 1" });
            expect(response.status).toBe(201);
            expect(mockCreateTodoUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        }));
        test("GET /todo returns 500 on use case error", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockCreateTodoUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).post("/todo").send({ title: "Todo 1", description: "Description 1" });
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error creating data" });
        }));
    });
    describe("PUT /todo/:id", () => {
        test("should return 200 with data", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = { id: 1, title: "Todo 1", description: "Description 1", isCompleted: false };
            jest.spyOn(mockUpdateTodoByIdUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData));
            const response = yield (0, supertest_1.default)(server_1.default).put("/todo/1").send({ title: "Todo 1", description: "Description 1" });
            expect(response.status).toBe(200);
            expect(mockUpdateTodoByIdUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        }));
        test("GET /todo returns 500 on use case error", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockUpdateTodoByIdUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).put("/todo/1").send({ title: "Todo 1", description: "Description 1" });
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({ message: "Error updating data" });
        }));
    });
    describe("DELETE /todo/:id", () => {
        test("should return 200 with data", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = { message: "Todo deleted successfully" };
            jest.spyOn(mockDeleteTodoByIdUseCase, "execute").mockImplementation(() => Promise.resolve(true));
            const response = yield (0, supertest_1.default)(server_1.default).delete("/todo/1");
            expect(response.status).toBe(200);
            expect(mockDeleteTodoByIdUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        }));
        test("GET /todo returns 500 on use case error", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(mockDeleteTodoByIdUseCase, "execute").mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).delete("/todo/1");
            expect(response.status).toBe;
            expect(response.body).toStrictEqual({ message: "Error deleting data" });
        }));
    });
});
