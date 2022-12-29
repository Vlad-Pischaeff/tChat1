import React from 'react';
import { useForm } from "react-hook-form";
import { useAddTodoMutation } from 'store/api/todosApi';
import s from './Notes.module.sass';

type tFormInputs = {
    description: string;
};

export const Notes = () => {
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
                        <input { ...register("description") } placeholder="New note..." />
                    </fieldset>
                </div>

                <input type="submit" value="Add note" />
            </form>

            <div className={s.Main}>
                <p>No notes...</p>
            </div>

            <div className={s.Footer}>
                Notes service footer
            </div>
        </>
    );
};
