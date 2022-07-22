import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoginUserMutation, useLazyUsersQuery } from '../api/usersApi';
import { IFormInputs, Warning, InputType } from './Types';
import * as yup from "yup";
import * as ICON from '../assets/img';
import s from './Auth.module.sass';

const schema = yup.object({
    password: yup.string().min(5).max(20).required(),
    name: yup.string().max(20).required(),
}).required();

export const LoginPage = () => {
    const [ trigger ] = useLazyUsersQuery();
    const [ loginUser ] = useLoginUserMutation();
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
            .validate(data)                 // проверяем введенные данные
            .then(data => {
                loginUser(data)             // вызываем API '/users/login'
                    .unwrap()                
                    .then(payload => {
                        console.log('login fulfilled', payload);
                        localStorage.setItem('token', JSON.stringify(payload));
                    })
                    .catch(error => {
                        setWarning({ "errors": error.data.message });
                    })
            })
            .catch((err: Warning) => {
                setWarning({ "name": err.name, "errors": err.errors });
            });
    };

    const testQuery = () => {
        console.log('testQuery')
        trigger('', false)
            .then(data => console.log('trigger data...', data))
            .catch(error => console.log('trigger error...', error));
    }

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
                <input type="button" onClick={testQuery} />
            </form>
        </>
    );
};