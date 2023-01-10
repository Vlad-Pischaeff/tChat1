import React from 'react';
import { format } from 'date-fns';
import { useEditTodoMutation, useDeleteTodoMutation } from 'store/api/todosApi';
import * as UI from 'components/ui';
import * as ICON from 'assets/img';
import { iTodos } from 'store/api/apiTypes';
import s from './Todos.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    todo: iTodos,
}

export const TodosItem = ({ todo }: iProps) => {
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
        <div className={`${s.item} ${todo.done ? s.done : null}`}>
            <div className={s.itemDesc}>
                {todo.description}
            </div>
            <div className={s.itemDate}>
                { format(new Date(todo.date), 'dd.MMM.yyyy') }
            </div>
            <div className={s.itemCheck}>
                <UI.CheckBox checked={todo.done} idx={todo._id} onChange={handleChange}/>
            </div>
            <div className={s.itemDelete} onClick={handleClick}>
                <ICON.TrashIcon />
            </div>
        </div>
    );
};
