import React from 'react';
import { useForm } from "react-hook-form";
import { useAddTodoMutation } from 'store/api/todosApi';
import s from './Answers.module.sass';

type tFormInputs = {
    description: string;
};

export const Answers = () => {
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
                        <input { ...register("description") } placeholder="New answer..." />
                    </fieldset>
                </div>

                <input type="submit" value="Add answer" />
            </form>

            <div className={s.Main}>
                <div className={s.MainPlaceholder}>
                    <p>No answers/questions...</p>
                </div>
            </div>

            <div className={s.Footer}>
                Answers service footer
            </div>
        </>
    );
};
