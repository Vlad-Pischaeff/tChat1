import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setServicesModal, setEditedAnswer, setItemServiceMenu, eModal } from "store/slices/ui";
import { useEditAnswerMutation } from 'store/api/answersApi';
import { modules } from './EditorConfig';
import s from '../Services.module.sass';

export const Editor = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const [ updateAnswer ] = useEditAnswerMutation();
    const [ convertedText, setConvertedText ] = useState('');

    useEffect(() => {
        // ✅ invoke when editing note
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
                <div className={s.FormBodyEditor}>
                    <ReactQuill
                        className={s.Quill}
                        modules={modules}
                        theme='snow'
                        value={convertedText}
                        onChange={setConvertedText}
                    />
                </div>
                <div className={s.FormButtons}>
                    <input className={s.Button}
                        type="button"
                        value="Close"
                        onClick={closeModal} />
                    <input className={s.Button}
                        type="submit"
                        value={ui.editedAnswer ? "Update answer" : "Add answer"}
                        onClick={onSubmit} />
                </div>
            </div>

        </div>
    );
};
