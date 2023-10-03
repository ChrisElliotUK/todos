import request from 'supertest'
import { TodoRequestModel, TodoResponseModel } from '../../../src/domain/models/todo'
import { CreateTodoUseCase } from '../../../src/domain/interfaces/usecases/create_todo_usecase'
import { DeleteTodoByIdUseCase } from '../../../src/domain/interfaces/usecases/delete_todo_by_id_usecase'
import { GetAllTodosUseCase } from '../../../src/domain/interfaces/usecases/get_all_todos_usecase'
import { GetTodoByIdUseCase } from '../../../src/domain/interfaces/usecases/get_todo_by_id_usecase'
import { UpdateTodoByIdUseCase } from '../../../src/domain/interfaces/usecases/update_todo_by_id_usecase'
import TodoRouter from '../../../src/presentation/routers/todo_router'
import server from '../../../src/server'


class MockCreateTodoUseCase implements CreateTodoUseCase {
    execute(todo: TodoRequestModel): Promise<TodoResponseModel> {
        throw new Error("Method not implemented.")
    }
}

class MockDeleteTodoByIdUseCase implements DeleteTodoByIdUseCase {
    execute(id: number): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}

class MockGetAllTodosUseCase implements GetAllTodosUseCase {
    execute(): Promise<TodoResponseModel[]> {
        throw new Error("Method not implemented.")
    }
}

class MockGetTodoByIdUseCase implements GetTodoByIdUseCase {
    execute(id: number): Promise<TodoResponseModel | null> {
        throw new Error("Method not implemented.")
    }
}

class MockUpdateTodoByIdUseCase implements UpdateTodoByIdUseCase {
    execute(id: number, todo: TodoRequestModel): Promise<TodoResponseModel> {
        throw new Error("Method not implemented.")
    }
}

describe('Todo Router', () => {
    let mockCreateTodoUseCase: CreateTodoUseCase;
    let mockDeleteTodoByIdUseCase: DeleteTodoByIdUseCase;
    let mockGetAllTodosUseCase: GetAllTodosUseCase;
    let mockGetTodoByIdUseCase: GetTodoByIdUseCase;
    let mockUpdateTodoByIdUseCase: UpdateTodoByIdUseCase;

    beforeAll(() => {
        mockCreateTodoUseCase = new MockCreateTodoUseCase()
        mockDeleteTodoByIdUseCase = new MockDeleteTodoByIdUseCase()
        mockGetAllTodosUseCase = new MockGetAllTodosUseCase()
        mockGetTodoByIdUseCase = new MockGetTodoByIdUseCase()
        mockUpdateTodoByIdUseCase = new MockUpdateTodoByIdUseCase()
        server.use("/todo", TodoRouter(mockCreateTodoUseCase, mockGetAllTodosUseCase, mockGetTodoByIdUseCase, mockUpdateTodoByIdUseCase, mockDeleteTodoByIdUseCase))

    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("GET /todo", () => {

        test("should return 200 with data", async () => {
            const ExpectedData = [{ id: 1, title: "Todo 1", description: "Description 1", isCompleted: false }]
            jest.spyOn(mockGetAllTodosUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/todo")

            expect(response.status).toBe(200)
            expect(mockGetAllTodosUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)
        })

        test("GET /todo returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllTodosUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/todo")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        });
    })

    describe("GET /todo/:id", () => {
        test("should return 200 with data", async () => {
            const ExpectedData = { id: 1, title: "Todo 1", description: "Description 1", isCompleted: false }

            jest.spyOn(mockGetTodoByIdUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/todo/1")

            expect(response.status).toBe(200)
            expect(mockGetTodoByIdUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)
        })

        test("GET /todo returns 500 on use case error", async () => {
            jest.spyOn(mockGetTodoByIdUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/todo/1")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        });
    })

    describe("POST /todo", () => {
        test("should return 201 with data", async () => {
            const ExpectedData = { id: 1, title: "Todo 1", description: "Description 1", isCompleted: false }

            jest.spyOn(mockCreateTodoUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))
            const response = await request(server).post("/todo").send({ title: "Todo 1", description: "Description 1" })

            expect(response.status).toBe(201)
            expect(mockCreateTodoUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)
        })

        test("GET /todo returns 500 on use case error", async () => {
            jest.spyOn(mockCreateTodoUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/todo").send({ title: "Todo 1", description: "Description 1" })
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error creating data" })
        });
    })

    describe("PUT /todo/:id", () => {
        test("should return 200 with data", async () => {
            const ExpectedData = { id: 1, title: "Todo 1", description: "Description 1", isCompleted: false }

            jest.spyOn(mockUpdateTodoByIdUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).put("/todo/1").send({ title: "Todo 1", description: "Description 1" })

            expect(response.status).toBe(200)
            expect(mockUpdateTodoByIdUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)
        })


        test("GET /todo returns 500 on use case error", async () => {
            jest.spyOn(mockUpdateTodoByIdUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).put("/todo/1").send({ title: "Todo 1", description: "Description 1" })
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error updating data" })
        });
    })

    describe("DELETE /todo/:id", () => {
        test("should return 200 with data", async () => {
            const ExpectedData = { message: "Todo deleted successfully" }

            jest.spyOn(mockDeleteTodoByIdUseCase, "execute").mockImplementation(() => Promise.resolve(true))

            const response = await request(server).delete("/todo/1")


            expect(response.status).toBe(200)
            expect(mockDeleteTodoByIdUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)
        })

        test("GET /todo returns 500 on use case error", async () => {
            jest.spyOn(mockDeleteTodoByIdUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).delete("/todo/1")
            expect(response.status).toBe
            expect(response.body).toStrictEqual({ message: "Error deleting data" })
        });
    })

})

