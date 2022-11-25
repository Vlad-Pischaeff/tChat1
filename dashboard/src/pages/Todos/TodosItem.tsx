import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { format } from 'date-fns';
import { useEditTodoMutation } from 'store/api/todosApi';
import { CheckBox } from 'components/ui/CheckBox';
import { iTodos } from './Types';
import s from './Todos.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    todo: iTodos,
    idx: number | string
}

export const TodosItem: React.FC<PropsWithChildren<iProps>> = ({ todo, idx }) => {
    const [ updateTodo ] = useEditTodoMutation();

    const handleClick = () => {
        const data = { id: todo._id, done: !todo.done};
        updateTodo(data);
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
            <CheckBox checked={todo.done} idx={todo._id} onChange={handleClick}/>
        </div>
    );
};
