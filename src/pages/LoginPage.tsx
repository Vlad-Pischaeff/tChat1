import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import * as ICON from '../img';
import s from './Auth.module.sass';

interface IFormInputs {
    name: string;
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
    name: yup.string().max(20).required(),
}).required();

export const LoginPage = () => {
    const { watch, register, handleSubmit } = useForm<IFormInputs>();
    const [ warning, setWarning ] = useState<Warning>({});
    const [ type, setType ] = useState<InputType>(InputType.pw);

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

    const switchPassVisibility = () => {
        type === InputType.pw
            ? setType(InputType.txt)
            : setType(InputType.pw);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={s.authForm}>
                <div className={s.header}>
                    <p>Login</p>
                </div>

                <div className={s.body}>
                    <fieldset>
                        <label>Login Name</label>
                        <input { ...register("name") } placeholder="John Smith" />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <div className={s.inputWrap}>
                            <input { ...register("password") } placeholder="password" type={type} />
                            <img src={type === InputType.pw ? ICON.EyeBlocked : ICON.Eye} alt="eye blocked" onClick={switchPassVisibility} />
                        </div>
                    </fieldset>
                </div>

                <input type="submit" value="Login" />
                <div className={s.footer}>
                    { warning 
                        && <p>{ warning.errors }</p> 
                    }
                </div>
            </form>
        </>
    );
};