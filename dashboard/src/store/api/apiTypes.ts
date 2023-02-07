export type tWebsite = {
    _id: string,        // ⚠️ it is extra code, should be removed
    id: string,
    site: string,
    key: string,
    hash: string
}

export type tUser = {
    id: string,
    name: string,
    nickname: string,
    alias: string,
    email: string,
    password?: string,
    date: string,
    image: string,
    websites: tWebsite[],
}

export interface iTodos {
    // __v: number,
    _id: string,        // ⚠️ it is extra code, should be removed
    id: string,
    date: number,
    description: string,
    done: boolean,
    user: string
}

export interface iNotes {
    // __v: number,
    _id: string,        // ⚠️ it is extra code, should be removed
    id: string,
    date: number,
    title: string,
    description: string,
    type: string,
    user: string
}

export interface iAnswers {
    // __v: number,
    _id: string,        // ⚠️ it is extra code, should be removed
    id: string,
    date: number,
    description: string,
    type: string,
    user: string
}
