export interface TodoRequestModel {
    title: string;
    description: string;
    isCompleted: boolean;
}

export interface TodoResponseModel {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
}