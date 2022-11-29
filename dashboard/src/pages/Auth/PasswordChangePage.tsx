import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import bcrypt from 'bcryptjs-react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { setCredentials } from 'store/slices/auth';
import { resetMessage, setMessage, selectUI } from "store/slices/ui";
import { useGetUserIdFromTokenMutation, useUpdateUserMutation } from "store/api/usersApi";
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
    const [ updateUser ] = useUpdateUserMutation();
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
        // как только пользователь открывает ссылку, от получает token из параметра
        // после этого из токена извлекаем userId
        if (token) fetchUserIdFromToken(token);
    }, [token, getUserId]);

    useEffect(() => {
        // это нужно для сброса ошибок до истечения времени показа SnackBar
        const subscription = watch(() => {
            if (ui.message) {
                dispatch(resetMessage());
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, ui.message, dispatch]);

    const onSubmit = async (data: tFormPasswords) => {
        schema
            // проверяем введенные данные
            .validate(data)
            .then(async (data: tFormPasswords) => {
                // формируем хэш пароля после всех успешных проверок
                const hash = await bcrypt.hashSync(data.newpassword, 10);
                // пользователю устанавливаем accessToken для успешного выполнения запроса
                const credentials = {
                    id: userId,
                    accessToken: token ,
                    isAuthenticated: true
                };
                dispatch(setCredentials(credentials));
                // здесь вызываем API запрос к базе на изменение пароля
                updateUser({ id: userId, body: { password: hash }});
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
