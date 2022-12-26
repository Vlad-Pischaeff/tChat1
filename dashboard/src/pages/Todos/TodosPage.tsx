import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useTodosQuery, useAddTodoMutation } from 'store/api/todosApi';
import { TodosItem } from './TodosItem';
import { iTodos } from 'store/api/apiTypes';
import * as UI from 'components/ui';
import s from './Todos.module.sass';

const TYPES = [ "All", "Completed", "Pending" ] as const;
type tTypes = typeof TYPES[number];

type tFormInputs = {
    description: string;
}

export const TodosPage = () => {
    const [ addTodo ] = useAddTodoMutation();
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();
    const [ checked, setChecked ] = useState<tTypes>("All");
    const { data, isSuccess, isLoading } = useTodosQuery('');

    const filteredData = (data) && filterTodos(checked, data);

    const onSubmit = (data: tFormInputs) => {
        // вызываем API '/todos', добавляем 'todo'
        addTodo(data);
        resetField('description');
    };

    function filterTodos(check: tTypes, data: iTodos[]): iTodos[] | undefined {
        if (check === "All") return data;
        if (check === "Completed") return data.filter(todo => todo.done === true);
        if (check === "Pending") return data.filter(todo => todo.done === false);
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.header}>
                    <p>Todos Page</p>
                </div>
                <div className={s.body}>

                    <form onSubmit={handleSubmit(onSubmit)} className={s.todosForm}>
                        <div className={s.todosBody}>
                            <fieldset>
                                <label>Description</label>
                                <input { ...register("description") } placeholder="My todo..." />
                            </fieldset>
                        </div>

                        <input type="submit" value="Add todo" />
                    </form>

                    <div className={s.todosWrapper}>
                        { isSuccess && filteredData &&
                            filteredData.map((todo, idx) =>
                                <TodosItem key={todo._id} todo={todo} idx={idx} />
                        )}
                        { isLoading && <div>Loading...</div>}
                    </div>

                    <div className={s.todosFooter}>
                        { TYPES.map(type =>
                            <div className={s.todosFooterItem} key={type}>
                                <p className={checked === type ? s.done : ''}>{type}</p>
                                <UI.CheckBox
                                    idx={type}
                                    checked={checked === type}
                                    onChange={() => setChecked(type)}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
