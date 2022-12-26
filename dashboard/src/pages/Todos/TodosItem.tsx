import React, { HTMLAttributes } from 'react';
import { format } from 'date-fns';
import { useEditTodoMutation, useDeleteTodoMutation } from 'store/api/todosApi';
import * as UI from 'components/ui';
import { iTodos } from 'store/api/apiTypes';
import s from './Todos.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    todo: iTodos,
    idx: number | string
}

export const TodosItem = ({ todo, idx }: iProps) => {
    const [ updateTodo ] = useEditTodoMutation();
    const [ deleteTodo ] = useDeleteTodoMutation();

    const handleChange = () => {
        const body = { done: !todo.done };
        const data = { id: todo._id, ...body };
        updateTodo(data);
    }

    const handleClick = () => {
        const data = { id: todo._id };
        deleteTodo(data);
    }

    return (
        <div className={s.item}>
            <div className={`${s.itemNum} ${todo.done ? s.done : null}`}>
                {idx}
            </div>
            <div className={`${s.itemDesc} ${todo.done ? s.done : null}`}>
                {todo.description}
            </div>
            <div className={`${s.itemDate} ${todo.done ? s.done : null}`}>
                { format(new Date(todo.date), 'dd.MMM.yyyy') }
            </div>
            <UI.CheckBox checked={todo.done} idx={todo._id} onChange={handleChange}/>
            <UI.Delete checked={todo.done} onClick={handleClick}/>
        </div>
    );
};
