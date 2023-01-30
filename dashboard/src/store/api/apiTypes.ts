export type tWebsite = {
    site: string,
    key: string,
    hash: string
}

export type tUser = {
    name: string,
    email: string,
    password?: string,
    date: string,
    image: string,
    websites: tWebsite[],
}

export interface iTodos {
    __v: number,
    _id: string,
    date: number,
    description: string,
    done: boolean,
    user: string
}

export interface iNotes {
    __v: number,
    _id: string,
    date: number,
    title: string,
    description: string,
    type: string,
    user: string
}

export interface iAnswers {
    __v: number,
    _id: string,
    date: number,
    description: string,
    type: string,
    user: string
}
