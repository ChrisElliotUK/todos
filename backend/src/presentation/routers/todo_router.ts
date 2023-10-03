import express from 'express'
import { Request, Response } from 'express'
import { CreateTodoUseCase } from '../../domain/interfaces/usecases/create_todo_usecase'
import { GetAllTodosUseCase } from '../../domain/interfaces/usecases/get_all_todos_usecase'
import { GetTodoByIdUseCase } from '../../domain/interfaces/usecases/get_todo_by_id_usecase'
import { UpdateTodoByIdUseCase } from "../../domain/interfaces/usecases/update_todo_by_id_usecase";
import { DeleteTodoByIdUseCase } from '../../domain/interfaces/usecases/delete_todo_by_id_usecase'


export default function TodoRouter(
    createTodoUseCase: CreateTodoUseCase,
    getAllTodosUseCase: GetAllTodosUseCase,
    getTodoByIdUseCase: GetTodoByIdUseCase,
    updateTodoByIdUseCase: UpdateTodoByIdUseCase,
    deleteTodoByIdUseCase: DeleteTodoByIdUseCase
) {
    const router = express.Router()

    router.get('/', async (_: Request, res: Response) => {
        try {
            const todos = await getAllTodosUseCase.execute()

            res.send(todos)
        } catch (err) {

            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const todo = await getTodoByIdUseCase.execute(parseInt(req.params.id))

            res.statusCode = 200
            res.send(todo)
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            const todo = await createTodoUseCase.execute(req.body)
            res.statusCode = 201
            res.send(todo)

        } catch (err) {
            res.status(500).send({ message: "Error creating data" })
        }
    })

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const todo = await updateTodoByIdUseCase.execute(parseInt(req.params.id), req.body)

            res.statusCode = 200
            res.send(todo)
        } catch (err) {
            res.status(500).send({ message: "Error updating data" })
        }
    })

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            await deleteTodoByIdUseCase.execute(parseInt(req.params.id))
            res.send({ message: "Todo deleted successfully" })
        } catch (err) {
            res.status(500).send({ message: "Error deleting data" })
        }
    })

    return router

}

