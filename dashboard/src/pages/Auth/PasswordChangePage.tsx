import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { resetMessage, setMessage, selectUI } from "store/slices/ui";
import { useGetUserIdFromTokenMutation } from "store/api/usersApi";
import { tFormPasswords, tWarning, InputType } from './Types';
import * as yup from "yup";
import * as ICON from 'assets/img';
import s from './Auth.module.sass';

const schema = yup.object().shape({
    newpassword:
        yup
            .string()
            .min(5)
            .max(20)
            .required(),
    repeatpassword:
        yup
            .string()
            .oneOf([yup.ref('newpassword'), null], 'Passwords don\'t match')
            .required(),
}).required();

export const PasswordChangePage = () => {
    const { token } = useParams();
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ getUserId ] = useGetUserIdFromTokenMutation();
    const [ userId, setUserId ] = useState('');
    const { watch, register, handleSubmit } = useForm<tFormPasswords>();
    const [ type, setType ] = useState<InputType>(InputType.pw);

    useEffect(() => {
        const fetchUserIdFromToken = async (token: string) => {
            const user = await getUserId({ 'token': token });
            if ('data' in user) {
                setUserId(user.data.id);
            }
        };

        if (token) fetchUserIdFromToken(token);
    }, [token, getUserId]);

    useEffect(() => {
        if (userId) console.log('useEffect..userId..', userId);
    }, [userId]);

    useEffect(() => {
        const subscription = watch(() => {
            if (ui.message) {
                dispatch(resetMessage());
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, ui.message, dispatch]);

    const onSubmit = async (data: tFormPasswords) => {
        schema
            .validate(data)             // проверяем введенные данные
            .then((data: tFormPasswords) => {
                console.log('data...', data)
                // addUser(data);          // здесь вызываем API запросы к базе на регистрацию
            })
            .catch((err: tWarning) => {
                const message = err.errors?.[0] || '';
                dispatch(setMessage(message));
            });
    };

    const switchPassVisibility = () => { // показать/скрыть пароль
        type === InputType.pw
            ? setType(InputType.txt)
            : setType(InputType.pw);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={s.authForm}>
                <div className={s.header}>
                    <p>Set new password</p>
                </div>

                <div className={s.body}>
                    <fieldset>
                        <label>New Password</label>
                        <input {...register("newpassword")} placeholder="new password" type="text" />
                    </fieldset>
                    <fieldset>
                        <label>Repeat new Password</label>
                        <div className={s.inputWrap}>
                            <input {...register("repeatpassword")} placeholder="repeat new password" type={type} />
                            <img src={type === InputType.pw ? ICON.EyeBlocked : ICON.Eye} alt="eye blocked" onClick={switchPassVisibility} />
                        </div>
                    </fieldset>
                </div>

                <input type="submit" value="Submit" />

            </form>
        </>
    );
};
