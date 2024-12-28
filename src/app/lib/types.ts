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
}

export type UserAchievement = {
    id: number,
    name: string;
    image: string;
    description: string;
    // userId: string;
    user_id: string;
    stars: 0 | 1 | 2 | 3;
}



export interface UserAchievementNoId extends Omit<UserAchievement, 'user_id'> {}

export type TaskType = "event" | "chore"

export type ApiResponse<T> = {
    status: number;
    data: T;
};

export type CreateTaskResponse = {
    message: string;
    achievements: UserAchievement[];
};

export type Task = {
    id: number,
    title: string,
    startDate: Date,
    endDate: Date,
    description: string,
    taskType: TaskType
}

export interface ProcessedTask extends Task {
    processed: boolean
}

export interface ProcessedTaskString extends TaskString {
    processed: boolean
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

export interface setTasksInterface {
    formatedTasks: UserTasksStringValuePairFormat;
    fullTasks: TaskString[]
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

export interface apiDeletedTask {

    title: string
    status: number
}
