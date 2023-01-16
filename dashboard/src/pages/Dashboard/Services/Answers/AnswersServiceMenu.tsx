import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedAnswer, setItemServiceMenu, eModal } from "store/slices/ui";
import { useDeleteAnswerMutation } from 'store/api/answersApi';
import * as ICONS from 'assets/img';
import { iAnswers } from 'store/api/apiTypes';
import s from '../Services.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    answer: iAnswers
}

export const AnswersServiceMenu = ({ answer }: iProps) => {
    const dispatch = useAppDispatch();
    const [ deleteAnswer ] = useDeleteAnswerMutation();

    const handlerEditAnswer = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setEditedAnswer(answer));
        dispatch(setServicesModal(eModal.answer));
        handlerHideMenu(e);    // ✅ hide menu after editing
    }

    const handlerMarkAnswer = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu({ answerMark: answer._id }));
    }

    const handlerDeleteAnswer = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        deleteAnswer({ id: answer._id });
        handlerHideMenu(e);    // ✅ hide menu after deleting
    }

    const handlerHideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu(null));
    }

    return (
        <div className={s.ServiceMenuContainer}>
            <div className={s.ServiceMenuBG} onClick={handlerHideMenu}></div>

            <div className={s.ServiceMenuWrap} role="menu">
                <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerEditAnswer}>
                    <ICONS.EditIcon />
                    <p>Edit answer</p>
                </div>

                <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerMarkAnswer}>
                    <ICONS.LabelIcon />
                    <p>Mark answer</p>
                </div>

                <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerDeleteAnswer}>
                    <ICONS.TrashIcon />
                    <p>Delete answer</p>
                </div>
            </div>
        </div>
    );
};
