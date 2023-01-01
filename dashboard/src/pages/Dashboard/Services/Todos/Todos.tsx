import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setServicesModalHidden } from "store/slices/ui";
import { useTodosQuery} from 'store/api/todosApi';
import { TodosItem } from './TodosItem';
import { iTodos } from 'store/api/apiTypes';
import * as UI from 'components/ui';
import s from './Todos.module.sass';
import { TodosAddForm } from './TodosAddForm';

const TYPES = [ "All", "Completed", "Pending" ] as const;
type tTypes = typeof TYPES[number];

export const Todos = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const { refetch, data, isSuccess, isLoading } = useTodosQuery('');
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

    const handlerClick = () => {
        dispatch(setServicesModalHidden(false));
    }

    return (
        <>
            <input type="button" className={s.AddItem} value="+ add todo" onClick={handlerClick} />

            <TodosAddForm />

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
