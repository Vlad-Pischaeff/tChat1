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

    const openModal = () => {
        console.log('open modal...')
    }

    return (
        <>
            <input type="button" className={s.AddItem} value="+ add note" onClick={openModal} />

            <div className={s.Main}>
                <div className={s.MainPlaceholder}>
                    <p>No notes...</p>
                </div>
            </div>

            <div className={s.Footer}>
                Notes service footer
            </div>
        </>
    );
};
