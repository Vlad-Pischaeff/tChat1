import React from 'react';
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setServicesModal, eModal } from "store/slices/ui";
import { useAddAnswerMutation } from 'store/api/answersApi';
import s from './Answers.module.sass';

type tFormInputs = {
    description: string;
}

export const AnswersAddForm = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ addAnswer ] = useAddAnswerMutation();
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();

    const onSubmit = (data: tFormInputs) => {
        // ✅ вызываем API '/answers', добавляем 'answer'
        addAnswer(data);
        if (data.description) closeModal();
    };

    const closeModal = () => {
        resetField('description');
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <div className={`${s.ModalWrap} ${ui.servicesModal === eModal.answer ? '' : s.hide}`}>

            <div className={s.ModalBG}></div>

            <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
                <div className={s.FormBody}>
                    <fieldset>
                        <label>Description</label>
                        <div className={s.FormTextArea}>
                            <textarea
                                { ...register("description") }
                                placeholder="My new answer..."
                                rows={3} />
                        </div>
                    </fieldset>
                </div>
                <div className={s.FormButtons}>
                    <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                    <input className={s.Button} type="submit" value="Add answer" />
                </div>
            </form>

        </div>
    );
};
