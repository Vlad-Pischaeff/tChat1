import React from 'react';
import { useForm } from "react-hook-form";
import { useAddTodoMutation } from 'store/api/todosApi';
import s from './Mail.module.sass';

type tFormInputs = {
    description: string;
};

export const Mail = () => {
    const [ addTodo ] = useAddTodoMutation();
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();

    const onSubmit = (data: tFormInputs) => {
        // вызываем API '/todos', добавляем 'todo'
        addTodo(data);
        resetField('description');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
                <div className={s.FormBody}>
                    <fieldset>
                        {/* <label>Description</label> */}
                        <input { ...register("description") } placeholder="My mail..." />
                    </fieldset>
                </div>

                <input type="submit" value="Add mail" />
            </form>

            <div className={s.Main}>
                Mail service
            </div>

            <div className={s.Footer}>
                Mail service footer
            </div>
        </>
    );
};