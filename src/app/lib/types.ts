export type LoginParams = {
    username: string,
    email: string,
    password: string
}

export type RegisterParams = {
    username: string,
    email: string,
    password: string
}

export type UserDb = {
    id: string
    username: string,
    email: string,
    password: string
}

export type Achievement = {
    id: number,
    name: string;
    image: string;
    description: string;
    stars: 0 | 1 | 2 | 3;
}


// task types


// export enum TaskType {
//     Event = "event",
//     Chore = "chore"
// }


export type TaskType = "event" | "chore"

export type Task = {
    id: number,
    title: string,
    startDate: Date,
    endDate: Date,
    description: string,
    taskType: TaskType
}

export interface TaskString extends Omit<Task, 'startDate' | 'endDate' | 'taskType'> {
    startDate: string;
    endDate: string;
    taskType: string;
}

export type TaskStringJson = {
    task : { [key: string]: TaskString | TaskString[] }
}

export type UserTasksValuePairFormat = {
    [key: string]: Task | Task[];
}

export type UserTasksStringValuePairFormat = {
    [key: string]: TaskString | TaskString[];
}


export type KeyResult = |
{   refreshKey?: string;
    accessKey?: string;
    result: string;
    message: string;   
    userId?:  string
}

export type createToken = 
| {
    success: true,
    token : string
  } 
| {
    success : false
}

export type KeysInDb = |
{
    refreshToken: string,
    accessToken: string,
} | {
    message: string
}


export type taskTypeColorTheme = 
{
    fontColor: string,
    backgroundColor: string,
}
