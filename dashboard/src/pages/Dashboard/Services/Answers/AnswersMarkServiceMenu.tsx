import React from 'react';
import { useAppDispatch } from 'store/hook';
import { useEditAnswerMutation } from 'store/api/answersApi';
import { setItemServiceMenu } from "store/slices/ui";
import { iAnswers } from 'store/api/apiTypes';
import { SYMBOLS } from './AnswersVariables';
import s from '../Services.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    answer: iAnswers
}

export const AnswersMarkServiceMenu = ({ answer }: iProps) => {
    const dispatch = useAppDispatch();
    const [ updateAnswer ] = useEditAnswerMutation();

    const handlerSelectColor = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const body = { type: e.currentTarget.id };
        const data = { id: answer._id, ...body };
        updateAnswer(data);
        handlerHideMenu(e);    // ✅ hide menu after marking
    }

    const handlerHideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu(null));
    }

    return (
        <div className={s.ServiceMenuContainer}>
            <div className={s.ServiceMenuBG} onClick={handlerHideMenu}></div>

            <div className={s.ServiceMenuGrid} role="menu">
                { SYMBOLS.map(symbol =>
                    <div
                        key={symbol.key}
                        id={symbol.key}
                        className={s.ServiceMenuItem}
                        role="menuitem"
                        onClick={handlerSelectColor}
                    >
                        {symbol.render()}
                    </div>
                )}
            </div>
        </div>
    );
};
