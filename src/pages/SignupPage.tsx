import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import EyeBlocked from '@icon/icofont/icons/eye-blocked.svg';
import Eye from '@icon/icofont/icons/eye.svg';

interface IFormInputs {
    login: string;
    email: string;
    password: string;
}

type Warning = {
    name?: string;
    errors?: string | Array<string>;
}

enum InputType { 
    pw = "password", 
    txt = "text",
}

const schema = yup.object({
    password: yup.string().min(5).max(20).required(),
    email: yup.string().email().required(),
    login: yup.string().max(20).required(),
}).required();

export const SignupPage = () => {
    const { watch, register, handleSubmit } = useForm<IFormInputs>();
    const [ warning, setWarning ] = useState<Warning>({});
    const [ type, setType ] = useState<InputType>(InputType.pw);

    useEffect(() => {
        const subscription = watch(() => {
            if (warning?.errors) {
                setWarning({});                             // сбрасываем ошибки при изменении инпутов
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, warning]);

    const onSubmit = (data: IFormInputs) => {
        schema
            .validate(data)
            .then(data => console.log('formData..', data))  // здесь вызываем API запросы к базе на валидацию
            .catch((err: Warning) => {
                setWarning({ "name": err.name, "errors": err.errors });
            });
    };

    const switchPassVisibility = () => {                    // показать/скрыть пароль
        type === InputType.pw
            ? setType(InputType.txt)
            : setType(InputType.pw);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="authForm">
                <div className="fs-header">
                    <p>Signup</p>
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
                        <div className="input-container">
                            <input {...register("password")} placeholder="password" type={type} />
                            <img src={type === InputType.pw ? EyeBlocked : Eye} alt="eye blocked" onClick={switchPassVisibility} />
                        </div>
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
