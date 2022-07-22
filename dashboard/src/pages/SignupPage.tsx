import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../api/usersApi";
import { IFormInputs, Warning, InputType } from './Types';
import * as yup from "yup";
import * as ICON from '../assets/img';
import s from './Auth.module.sass';

const schema = yup.object({
    password: yup.string().min(5).max(20).required(),
    email: yup.string().email().required(),
    name: yup.string().max(20).required(),
}).required();

export const SignupPage = () => {
    const [ addUser ] = useAddUserMutation();
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
            .validate(data)             // проверяем введенные данные
            .then(data => {
                console.log('formData..', data);
                addUser(data)           // здесь вызываем API запросы к базе на валидацию
                    .unwrap()                
                    .then(payload => {  // здесь получаем jwtToken
                        console.log('register fulfilled', payload);
                        localStorage.setItem('token', JSON.stringify(payload));
                    })
                    .catch(error => {
                        setWarning({ "errors": error.data.message });
                    });
            })
            .catch((err: Warning) => {
                setWarning({ "name": err.name, "errors": err.errors });
            });
    };

    const switchPassVisibility = () => {                    // показать/скрыть пароль
        type === InputType.pw
            ? setType(InputType.txt)
            : setType(InputType.pw);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={s.authForm}>
                <div className={s.header}>
                    <p>Signup</p>
                </div>

                <div className={s.body}>
                    <fieldset>
                        <label>Login Name</label>
                        <input {...register("name")} placeholder="John Smith" />
                    </fieldset>
                    <fieldset>
                        <label>Email</label>
                        <input {...register("email")} placeholder="mail@mail.com" />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <div className={s.inputWrap}>
                            <input {...register("password")} placeholder="password" type={type} />
                            <img src={type === InputType.pw ? ICON.EyeBlocked : ICON.Eye} alt="eye blocked" onClick={switchPassVisibility} />
                        </div>
                    </fieldset>
                </div>

                <input type="submit" value="Submit" />
                <div className={s.footer}>
                    { warning 
                        && <p>{ warning.errors }</p> 
                    }
                </div>
            </form>
        </>
    );
};
