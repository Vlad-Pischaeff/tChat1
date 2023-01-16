import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setItemServiceMenu } from "store/slices/ui";
import * as ICONS from 'assets/img';
import { iAnswers } from 'store/api/apiTypes';
// import { NotesServiceMenu } from './NotesServiceMenu';
// import { NotesMarkServiceMenu } from './NotesMarkServiceMenu';
import { SYMBOLS } from './AnswersVariables';
import s from '../Services.module.sass';

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    answer: iAnswers
}

export const AnswersItem = ({ answer }: iProps) => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);

    const showMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu({ noteActions: answer._id }));
    }

    const iconIndex = (
            val: string,
            obj: Array<{key: string, render: () => React.ReactElement}>
        ) => {
        // find index of item in array, return 0 if not found
        const index = obj.findIndex(item => item.key === val);
        return index === -1
            ? 0
            : index;
    }

    return (
        <div className={s.Summary}>
            <div key={answer._id} className={s.SummaryContainer} role='listitem'>
                <p className={s.itemIcon}>{SYMBOLS[iconIndex(answer.type, SYMBOLS)].render()}</p>
                <p className={s.itemDesc}>{answer.description}</p>

                <div className={s.SummaryMenu} onClick={showMenu}>
                    <ICONS.ServiceMenuIcon />
                </div>

                <div className={s.SummaryMenu} onClick={showMenu}>
                    <ICONS.SendIcon />
                </div>
                {/* { ui.serviceMenu.noteActions === answer._id &&
                    <NotesServiceMenu note={answer} />
                }

                { ui.serviceMenu.noteMark === answer._id &&
                    <NotesMarkServiceMenu note={answer} />
                } */}
            </div>
        </div>
    );
};
