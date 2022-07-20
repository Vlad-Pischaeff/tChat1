import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IFormInputs {
    login: string;
    email: string;
    password: string;
}

type Warning = {
    name?: string;
    errors?: string | Array<string>;
}

const schema = yup.object({
    password: yup.string().min(5).max(20).required(),
    email: yup.string().email().required(),
    login: yup.string().max(20).required(),
}).required();

export const LoginPage = () => {
    const { watch, register, handleSubmit } = useForm<IFormInputs>();
    const [ warning, setWarning ] = useState<Warning>({});

    useEffect(() => {
        const subscription = watch(() => {
            if (warning?.errors) {
                setWarning({});
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, warning]);

    const onSubmit = (data: IFormInputs) => {
        schema
            .validate(data)
            .then(data => console.log('formData..', data))
            .catch((err: Warning) => {
                setWarning({ "name": err.name, "errors": err.errors });
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="authForm">
                <div className="fs-header">
                    <p>Login</p>
                </div>
                
                <div className="fs-body">
                    <fieldset>
                        <label>Login Name</label>
                        <input {...register("login")} placeholder="John Smith" />
                    </fieldset>
                    <fieldset>
                        <label>Email</label>
                        <input {...register("email")} placeholder="mail@mail.com" />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <input {...register("password")} placeholder="password" type="password" />
                    </fieldset>
                </div>

                <input type="submit" value="Login" />
                <div className="fs-footer">
                    { warning 
                        && <p>{ warning.errors }</p> 
                    }
                </div>
            </form>
        </>
    );
};
