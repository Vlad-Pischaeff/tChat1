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
