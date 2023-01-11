import React from 'react';
// import { useForm } from "react-hook-form";
import { useAppDispatch } from 'store/hook';
import { setServicesModal, eModal } from "store/slices/ui";
// import { useAddTodoMutation } from 'store/api/todosApi';
import s from './Answers.module.sass';

// type tFormInputs = {
//     description: string;
// };

export const Answers = () => {
    const dispatch = useAppDispatch();
    // const [ addTodo ] = useAddTodoMutation();
    // const { register, resetField, handleSubmit } = useForm<tFormInputs>();

    // const onSubmit = (data: tFormInputs) => {
    //     // вызываем API '/todos', добавляем 'todo'
    //     addTodo(data);
    //     resetField('description');
    // };

    const openModal = () => {
        dispatch(setServicesModal(eModal.ask));
    }

    return (
        <>
            <input type="button" className={s.AddItem} value="+ add answer" onClick={openModal} />

            <div className={s.Main}>
                <div className={s.MainPlaceholder}>
                    <p>No answers/questions...</p>
                </div>
            </div>

            <div className={s.Footer}>
                Answers service footer
            </div>
        </>
    );
};
