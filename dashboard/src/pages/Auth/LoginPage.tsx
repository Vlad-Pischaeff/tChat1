import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { resetMessage, setMessage, selectUI } from "store/slices/ui";
import { useLoginUserMutation } from 'store/api/usersApi';
import { IFormInputs, Warning, InputType } from './Types';
import * as yup from "yup";
import * as ICON from 'assets/img';
import s from './Auth.module.sass';

const schema = yup.object({
    password: yup.string().min(5).max(20).required(),
    name: yup.string().max(20).required(),
}).required();

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ loginUser ] = useLoginUserMutation();
    const { watch, register, handleSubmit } = useForm<IFormInputs>();
    const [ type, setType ] = useState<InputType>(InputType.pw);

    useEffect(() => {
        const subscription = watch(() => {
            if (ui.message) {
                dispatch(resetMessage());
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, ui.message, dispatch]);

    const onSubmit = async (data: IFormInputs) => {
        schema
            .validate(data)                 // проверяем введенные данные
            .then(data => {
                loginUser(data);            // вызываем API '/users/login' для авторизации
            })
            .catch((err: Warning) => {
                const message = err.errors?.[0] || '';
                dispatch(setMessage(message));
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
                    {/* transfer behavior to SnackBar
                    { ui.message
                        && <p>{ ui.message }</p>
                    }
                    */}
                    <p>Forgot password?</p>
                </div>
            </form>
        </>
    );
};
