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
const pg_todo_data_source_1 = require("../../../../src/data/data_sources/pg_data_source/pg_todo_data_source");
describe("Pg Todo DataSource", () => {
    let mockDatabase;
    beforeEach(() => {
        mockDatabase = {
            query: jest.fn()
        };
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("getAll", () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new pg_todo_data_source_1.PgTodoDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true }] }));
        const result = yield ds.getAll();
        expect(mockDatabase.query).toHaveBeenCalledWith("select * from tb_todo");
        expect(result).toStrictEqual([{ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true }]);
    }));
    test("getById", () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new pg_todo_data_source_1.PgTodoDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true }] }));
        const result = yield ds.getById(123);
        expect(result).toStrictEqual({ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true });
        expect(mockDatabase.query).toHaveBeenCalledWith("select * from tb_todo where id = $1 limit 1", [123]);
    }));
    test("create", () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new pg_todo_data_source_1.PgTodoDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true }] }));
        const result = yield ds.create({ title: "Todo 1", description: "Description 1", isCompleted: true });
        expect(mockDatabase.query).toHaveBeenCalledWith("insert into tb_todo (title, description, isCompleted) values ($1, $2, $3) returning *", ["Todo 1", "Description 1", true]);
        expect(result).toStrictEqual({ id: 123, title: "Todo 1", description: "Description 1", isCompleted: true });
    }));
    test("updateById", () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new pg_todo_data_source_1.PgTodoDataSource(mockDatabase);
        yield ds.updateById(123, { title: "Todo 1", description: "Description 1", isCompleted: false });
        expect(mockDatabase.query).toHaveBeenCalledWith("update tb_todo set title = $1, description = $2, isCompleted = $3 where id = $4 returning *", ["Todo 1", "Description 1", false, 123]);
    }));
    test("deleteById", () => __awaiter(void 0, void 0, void 0, function* () {
        const ds = new pg_todo_data_source_1.PgTodoDataSource(mockDatabase);
        yield ds.deleteById(123);
        expect(mockDatabase.query).toHaveBeenCalledWith("delete from tb_todo where id = $1", [123]);
    }));
});
