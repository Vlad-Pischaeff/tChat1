import React from 'react';
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setServicesModal, eModal } from "store/slices/ui";
import { useAddNoteMutation } from 'store/api/notesApi';
import s from './Notes.module.sass';

type tFormInputs = {
    title: string;
    description: string;
}

export const NotesAddForm = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ addNote ] = useAddNoteMutation();
    const { register, resetField, handleSubmit } = useForm<tFormInputs>();

    const onSubmit = (data: tFormInputs) => {
        // вызываем API '/notes', добавляем 'note'
        addNote(data);
        closeModal();
    };

    const closeModal = () => {
        resetField('title');
        resetField('description');
        dispatch(setServicesModal(eModal.none));
    }

    return (
        <div className={`${s.ModalWrap} ${ui.servicesModal === eModal.note ? '' : s.hide}`}>

            <div className={s.ModalBG}></div>

            <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
                <div className={s.FormBody}>
                    <fieldset>
                        <label>Title</label>
                        <input
                            { ...register("title") }
                            className={s.FormInput}
                            placeholder="New note title..." />
                    </fieldset>
                    <fieldset>
                        <label>Description</label>
                        <div className={s.FormTextArea}>
                            <textarea
                                { ...register("description") }
                                placeholder="New note description..."
                                rows={3} />
                        </div>
                    </fieldset>
                </div>
                <div className={s.FormButtons}>
                    <input className={s.Button} type="button" value="Close" onClick={closeModal} />
                    <input className={s.Button} type="submit" value="Add note" />
                </div>
            </form>

        </div>
    );
};
