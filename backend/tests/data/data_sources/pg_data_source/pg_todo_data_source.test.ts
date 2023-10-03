import { PgTodoDataSource } from "../../../../src/data/data_sources/pg_data_source/pg_todo_data_source";
import { DatabaseWrapper } from "../../../../src/data/interfaces/data_sources/database_wrapper";

describe("Pg Todo DataSource", () => {


    let mockDatabase: DatabaseWrapper

    beforeEach(() => {
        mockDatabase = {
            query: jest.fn()
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new PgTodoDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true }] }))
        const result = await ds.getAll();
        expect(mockDatabase.query).toHaveBeenCalledWith("select * from tb_todo")
        expect(result).toStrictEqual([{ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true }])
    })

    test("getById", async () => {
        const ds = new PgTodoDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true }] }))
        const result = await ds.getById(123);
        expect(result).toStrictEqual({ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true })
        expect(mockDatabase.query).toHaveBeenCalledWith("select * from tb_todo where id = $1 limit 1", [123])

    })

    test("create", async () => {
        const ds = new PgTodoDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true }] }))
        const result = await ds.create({ title: "Todo 1", description: "Description 1", isCompleted: true });
        expect(mockDatabase.query).toHaveBeenCalledWith("insert into tb_todo (title, description, isCompleted) values ($1, $2, $3) returning *", ["Todo 1", "Description 1", true])
        expect(result).toStrictEqual({ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true })
    })

    test("updateById", async () => {
        const ds = new PgTodoDataSource(mockDatabase);
        await ds.updateById(123, { title: "Todo 1", description: "Description 1", isCompleted: false });
        expect(mockDatabase.query).toHaveBeenCalledWith("update tb_todo set title = $1, description = $2, isCompleted = $3 where id = $4 returning *", ["Todo 1", "Description 1", false, 123])
    })

    test("deleteById", async () => {
        const ds = new PgTodoDataSource(mockDatabase);
        await ds.deleteById(123);
        expect(mockDatabase.query).toHaveBeenCalledWith("delete from tb_todo where id = $1", [123])
    })

})