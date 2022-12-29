import React, { useEffect, useMemo, useState } from 'react';
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
};

export const Todos = () => {
    const [ addTodo ] = useAddTodoMutation();
    const { refetch, data, isSuccess, isLoading } = useTodosQuery('');
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();
    const [ checked, setChecked ] = useState<tTypes>("All");

    useEffect(() => {
        refetch();
        // eslint-disable-next-line
    }, []);

    const FILTER = useMemo(() => ({
        [TYPES[0]]: (data: iTodos[]) => data,
        [TYPES[1]]: (data: iTodos[]) => data.filter(todo => todo.done === true),
        [TYPES[2]]: (data: iTodos[]) => data.filter(todo => todo.done === false),
    }), []);

    const onSubmit = (data: tFormInputs) => {
        // вызываем API '/todos', добавляем 'todo'
        addTodo(data);
        resetField('description');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
                <div className={s.Body}>
                    <fieldset>
                        {/* <label>Description</label> */}
                        <input { ...register("description") } placeholder="My todo..." />
                    </fieldset>
                </div>

                <input type="submit" value="Add todo" />
            </form>

            <div className={s.Main}>
                { !data &&
                    <div className={s.MainPlaceholder}>
                        <p>No todos...</p>
                    </div>
                }
                { isSuccess && data &&
                    FILTER[checked](data).map(todo =>
                        <TodosItem key={todo._id} todo={todo} />
                    )
                }
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
                    )
                }
            </div>
        </>
    );
};
