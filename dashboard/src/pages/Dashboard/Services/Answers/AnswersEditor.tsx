import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setServicesModal, setEditedAnswer, setItemServiceMenu, eModal } from "store/slices/ui";
import { useEditAnswerMutation } from 'store/api/answersApi';
import * as UI from 'components/ui';
import s from '../Services.module.sass';

export const AnswersEditor = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ updateAnswer ] = useEditAnswerMutation();
    const [ convertedText, setConvertedText ] = useState('');

    useEffect(() => {
        // ✅ invoke when editing answers
        if (ui.editedAnswer) {
            setConvertedText(ui.editedAnswer.description);
        }
        // eslint-disable-next-line
    }, [ui.editedAnswer]);

    const onSubmit = () => {
        if (ui.editedAnswer) {
            // ✅ вызываем API '/answers', обновляем 'answers'
            const updatedData = {
                id: ui.editedAnswer._id,
                description: convertedText
            };
            updateAnswer(updatedData);
        }
        closeModal();
    };

    const closeModal = () => {
        dispatch(setEditedAnswer(null));
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
