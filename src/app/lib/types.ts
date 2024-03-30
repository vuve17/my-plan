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


