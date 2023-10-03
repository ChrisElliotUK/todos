import { Pool } from "pg"
import { PgTodoDataSource } from "./data/data_sources/pg_data_source/pg_todo_data_source"
import TodoRouter from "./presentation/routers/todo_router"
import { GetTodoById } from "./domain/usecases/todo/get_todo_by_id"
import { GetAllTodos } from "./domain/usecases/todo/get_all_todos"
import { CreateTodo } from "./domain/usecases/todo/create_todo"
import { DeleteTodoById } from "./domain/usecases/todo/delete_todo_by_id"
import { UpdateTodoById } from "./domain/usecases/todo/update_todo_by_id"
import { TodoRepositoryImpl } from "./domain/repositories/todo_repository"
import server from "./server"

async function getPgDataSource() {
    const db = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'Todos',
        password: '',
        port: 5432,
    })
    return new PgTodoDataSource(db)

}

(async () => {
    const dataSource = await getPgDataSource();

    const todoMiddleWare = TodoRouter(
        new CreateTodo(new TodoRepositoryImpl(dataSource)),
        new GetAllTodos(new TodoRepositoryImpl(dataSource)),
        new GetTodoById(new TodoRepositoryImpl(dataSource)),
        new UpdateTodoById(new TodoRepositoryImpl(dataSource)),
        new DeleteTodoById(new TodoRepositoryImpl(dataSource))
    )

    server.use("/todo", todoMiddleWare)
    server.listen(4000, () => console.log("Running on http://localhost:4000"))

})()