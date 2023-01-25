import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUIEditedNote, setServicesModal, setEditedNote, eModal } from "store/slices/ui";
import { useAddNoteMutation, useEditNoteMutation } from 'store/api/notesApi';
import { withModalBG } from 'components/HOC';
import s from '../Services.module.sass';

type tFormInputs = {
    title: string;
    description: string;
}

export const NotesAddFormTmp = () => {
    const dispatch = useAppDispatch();
    const editedNote = useAppSelector(selectUIEditedNote);
    const [ addNote ] = useAddNoteMutation();
    const [ updateNote ] = useEditNoteMutation();
    const { register, setValue, resetField, handleSubmit } = useForm<tFormInputs>();

    useEffect(() => {
        // ✅ invoke when editing note
        if (editedNote) {
            setValue('title', editedNote.title);
            setValue('description', editedNote.description);
        }
        // eslint-disable-next-line
    }, [editedNote]);

    const onSubmit = (data: tFormInputs) => {
        if (editedNote) {
            // ✅ вызываем API '/notes', обновляем 'note'
            const updatedData = { id: editedNote._id, ...data };
            updateNote(updatedData);
        } else {
            // ✅ вызываем API '/notes', добавляем 'note'
            addNote(data);
        }
        closeModal();
    };

    const closeModal = () => {
        resetField('title');
        resetField('description');
        dispatch(setEditedNote(null));
        dispatch(setServicesModal(eModal.none));
    }

    return (
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
                <input className={s.Button} type="submit" value={editedNote ? "Update note" : "Add note"} />
            </div>
        </form>
    );
};

export const NotesAddForm = withModalBG(NotesAddFormTmp);
