import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setServicesModal, setEditedAnswer, eModal } from "store/slices/ui";
import { useAddAnswerMutation, useEditAnswerMutation } from 'store/api/answersApi';
import s from '../Services.module.sass';

type tFormInputs = {
    description: string;
}

export const AnswersAddForm = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ addAnswer ] = useAddAnswerMutation();
    const [ updateAnswer ] = useEditAnswerMutation();
    const { setValue, register, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        // ✅ invoke when editing note
        if (ui.editedAnswer) {
            setValue('description', ui.editedAnswer.description);
        }
        // eslint-disable-next-line
    }, [ui.editedAnswer]);

    const onSubmit = (data: tFormInputs) => {
        if (ui.editedAnswer) {
            // ✅ вызываем API '/answers', обновляем 'answers'
            const updatedData = { id: ui.editedAnswer._id, ...data };
            updateAnswer(updatedData);
        } else {
            // ✅ вызываем API '/answers', добавляем 'answers'
            addAnswer(data);
        }
        closeModal();
    };

    const closeModal = () => {
        resetField('description');
        dispatch(setEditedAnswer(null));
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <div className={s.ModalWrap}>

            <div className={s.ModalBG}></div>

            <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
                <div className={s.FormBody}>
                    <fieldset>
                        <label>Description</label>
                        <div className={s.FormTextArea}>
                            <textarea
                                { ...register("description") }
                                placeholder="My new answer..."
                                rows={5} />
                        </div>
                    </fieldset>
                </div>
                <div className={s.FormButtons}>
                    <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                    <input className={s.Button} type="submit" value={ui.editedAnswer ? "Update answer" : "Add answer"} />
                </div>
            </form>

        </div>
    );
};
