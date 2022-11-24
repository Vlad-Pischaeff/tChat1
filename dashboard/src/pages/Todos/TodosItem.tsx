import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { useEditTodoMutation } from 'store/api/todosApi';
import { iTodos } from './Types';
import { customDate } from 'assets/utils';
import s from './Todos.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    todo: iTodos,
    idx: number
}

export const TodosItem: React.FC<PropsWithChildren<iProps>> = ({ todo, idx }) => {
    const [ updateTodo ] = useEditTodoMutation();

    const handleClick = () => {
        const data = { id: todo._id, done: !todo.done};
        updateTodo(data);
    }

    return (
        <div className={s.item}>
            <div className={s.itemNum}>
                {idx}
            </div>
            <div className={s.itemDesc}>
                {todo.description}
            </div>
            <div className={s.itemDate}>
                {customDate(todo.date)}
            </div>
            <div className={s.itemCheck} onClick={handleClick}>
                {todo.done ? '[ V ]' : '[ - ]'}
            </div>
        </div>
    );
};
