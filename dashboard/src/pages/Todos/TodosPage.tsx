import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useLazyTodosQuery, useAddTodoMutation } from 'store/api/todosApi';
import { TodosItem } from './TodosItem';
import { iTodos } from './Types';
import s from './Todos.module.sass';

type tFormInputs = {
    description: string;
};

export const TodosPage = () => {
    const [ addTodo ] = useAddTodoMutation();
    const { watch, register, handleSubmit } = useForm<tFormInputs>();
    const [ trigger, result ] = useLazyTodosQuery();

    useEffect(() => {
        trigger('', false);
    }, []);

    const onSubmit = (data: tFormInputs) => {
        // вызываем API '/todos', добавляем 'todo'
        addTodo(data);
    };

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
                        {result.isSuccess
                            ? result.data.map((todo: iTodos, idx: number) => {
                                return (
                                    <TodosItem key={todo._id} todo={todo} idx={idx} />
                                )
                            })
                            : <div>loading...</div>
                        }
                    </div>

                </div>
            </div>
        </>
    );
};
