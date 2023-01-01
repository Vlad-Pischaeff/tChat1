import React from 'react';
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setServicesModalHidden } from "store/slices/ui";
import { useAddTodoMutation } from 'store/api/todosApi';
import s from './Todos.module.sass';

type tFormInputs = {
    description: string;
}

export const TodosAddForm = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ addTodo ] = useAddTodoMutation();
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();

    const onSubmit = (data: tFormInputs) => {
        // вызываем API '/todos', добавляем 'todo'
        addTodo(data);
        resetField('description');
        dispatch(setServicesModalHidden(true));
    };

    return (
        <div className={`${s.ModalWrap} ${ui.servicesModalHidden ? s.hide : ''}`}>

            <div className={s.ModalBG}></div>

            <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
                <div className={s.FormBody}>
                    <fieldset>
                        <label>Description</label>
                        <input { ...register("description") } placeholder="My todo..." />
                    </fieldset>
                </div>
                <input type="submit" value="Add todo" />
            </form>

        </div>
    );
};
