export interface IFormInputs {
    name: string;
    password: string;
    email?: string;
}

export type Warning = {
    name?: string;
    errors?: string | Array<string>;
}

export const enum InputType { 
    pw = "password", 
    txt = "text",
}

export type IUser = {
    id: string | null;
    name: string | null;
    email: string | null;
    photo: string | null;
    jwtToken: string | null;
    isAuthenticated: boolean;
}