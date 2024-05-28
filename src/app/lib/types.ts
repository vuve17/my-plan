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

export type Task = {
    id: number,
    title: string,
    startDate: Date,
    endDate: Date,
    description: string,
    taskType: boolean
}

export type KeyResult = |
{   refreshKey?: string;
    accessKey?: string;
    result: string;
    message: string;   
    // keysArray?: string[]
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

