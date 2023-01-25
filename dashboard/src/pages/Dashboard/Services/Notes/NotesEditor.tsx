import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import {
    selectUIEditedNote,
    setServicesModal,
    setEditedNote,
    setItemServiceMenu,
    eModal
} from "store/slices/ui";
import { useEditNoteMutation } from 'store/api/notesApi';
import * as UI from 'components/ui';
import s from '../Services.module.sass';

export const NotesEditor = () => {
    const dispatch = useAppDispatch();
    const editedNote = useAppSelector(selectUIEditedNote);
    const [ updateNote ] = useEditNoteMutation();
    const [ convertedText, setConvertedText ] = useState('');

    useEffect(() => {
        // ✅ invoke when editing note's description
        if (editedNote) {
            setConvertedText(editedNote.description);
        }
        // eslint-disable-next-line
    }, [editedNote]);

    const onSubmit = () => {
        if (editedNote) {
            // ✅ вызываем API '/notes', обновляем 'note'
            const updatedData = {
                id: editedNote._id,
                description: convertedText
            };
            updateNote(updatedData);
        }
        closeModal();
    };

    const closeModal = () => {
        dispatch(setEditedNote(null));
        dispatch(setServicesModal(eModal.none));
        dispatch(setItemServiceMenu(null));
    }

    return (
        <div className={s.ModalWrap}>

            <div className={s.ModalBG}></div>

            <div className={s.FormEditor}>
                <UI.Editor
                    content={convertedText}
                    setContent={setConvertedText}
                    onClose={closeModal}
                    onSubmit={onSubmit}
                />
            </div>

        </div>
    );
};
