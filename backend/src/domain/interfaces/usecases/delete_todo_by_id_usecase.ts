

export interface DeleteTodoByIdUseCase {
    execute(id: number): Promise<boolean>;
}