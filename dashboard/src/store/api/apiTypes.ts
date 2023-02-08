type tMember = {
    member: string,
    sites: string[] | []
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
    team: tMember[]
}

export interface iTodos {
    id: string,
    user: string,
    date: number,
    description: string,
    done: boolean
}

export interface iNotes {
    id: string,
    user: string,
    date: number,
    title: string,
    description: string,
    type: string
}

export interface iAnswers {
    id: string,
    user: string,
    date: number,
    description: string,
    type: string
}

export interface iWebsites {
    id: string,
    user: string,
    site: string,
    key: string,
    hash: string,
}
