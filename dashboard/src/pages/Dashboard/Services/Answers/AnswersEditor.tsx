import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUIEditedAnswer, setServicesModal, setEditedAnswer, setItemServiceMenu, eModal } from "store/slices/ui";
import { useEditAnswerMutation } from 'store/api/answersApi';
import * as UI from 'components/ui';
import s from '../Services.module.sass';

export const AnswersEditor = () => {
    const dispatch = useAppDispatch();
    const editedAnswer = useAppSelector(selectUIEditedAnswer);
    const [ updateAnswer ] = useEditAnswerMutation();
    const [ convertedText, setConvertedText ] = useState('');

    useEffect(() => {
        // ✅ invoke when editing answers
        if (editedAnswer) {
            setConvertedText(editedAnswer.description);
        }
        // eslint-disable-next-line
    }, [editedAnswer]);

    const onSubmit = () => {
        if (editedAnswer) {
            // ✅ вызываем API '/answers', обновляем 'answers'
            const updatedData = {
                id: editedAnswer._id,
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
