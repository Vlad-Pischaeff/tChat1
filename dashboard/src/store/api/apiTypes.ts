export type tUser = {
    name: string,
    email: string,
    password?: string,
    date: string,
    photo: string
}

export interface iTodos {
    __v: number,
    _id: string,
    date: number,
    description: string,
    done: boolean,
    user: string
}
