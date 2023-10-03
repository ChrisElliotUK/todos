import { TodoRequestModel, TodoResponseModel } from "../../../domain/models/todo";
import { TodoDataSource } from "../../interfaces/data_sources/todo_data_source";
import { DatabaseWrapper } from "../../interfaces/data_sources/database_wrapper";

const DB_TABLE = 'tb_todo';

export class PgTodoDataSource implements TodoDataSource {

    private db: DatabaseWrapper;

    constructor(db: DatabaseWrapper) {
        this.db = db;

    }

    async create(todo: TodoRequestModel): Promise<TodoResponseModel> {
        const result = await this.db.query(`insert into ${DB_TABLE} (title, description, isCompleted) values ($1, $2, $3) returning *`, [todo.title, todo.description, todo.isCompleted])
        return result.rows[0];
    }

    async getAll(): Promise<TodoResponseModel[]> {
        const result = await this.db.query(`select * from ${DB_TABLE}`)
        return result.rows;
    }

    async getById(id: number): Promise<TodoResponseModel | null> {
        const dbResponse = await this.db.query(`select * from ${DB_TABLE} where id = $1 limit 1`, [id])
        const result = dbResponse.rows.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            isCompleted: item.isCompleted
        }));

        return result[0];
    }

    async updateById(id: number, todo: TodoRequestModel) {
        await this.db.query(`update ${DB_TABLE} set title = $1, description = $2, isCompleted = $3 where id = $4 returning *`, [todo.title, todo.description, todo.isCompleted, id])
    }

    async deleteById(id: number): Promise<boolean> {
        await this.db.query(`delete from ${DB_TABLE} where id = $1`, [id])
        return true;
    }

}
