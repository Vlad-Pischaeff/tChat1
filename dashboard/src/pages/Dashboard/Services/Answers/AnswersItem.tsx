import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setItemServiceMenu } from "store/slices/ui";
import * as ICONS from 'assets/img';
import { iAnswers } from 'store/api/apiTypes';
import { AnswersServiceMenu } from './AnswersServiceMenu';
import { AnswersMarkServiceMenu } from './AnswersMarkServiceMenu';
import { SYMBOLS_OBJ } from './AnswersVariables';
import s from '../Services.module.sass';

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    answer: iAnswers
}

export const AnswersItem = ({ answer }: iProps) => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);

    const showMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu({ answerActions: answer._id }));
    }

    const sendAnswer = () => {
        // TODO add logic
    }

    return (
        <div className={s.Summary}>
            <div key={answer._id} className={s.SummaryContainer} role='listitem'>
                <p className={s.itemIcon}>{SYMBOLS_OBJ[answer.type]()}</p>
                <p className={s.itemDesc}>{answer.description}</p>

                <div className={s.SummaryMenu} onClick={showMenu}>
                    <ICONS.ServiceMenuIcon />
                </div>

                <div className={s.SummaryMenu} onClick={sendAnswer}>
                    <ICONS.SendIcon />
                </div>
                { ui.serviceMenu.answerActions === answer._id &&
                    <AnswersServiceMenu answer={answer} />
                }

                { ui.serviceMenu.answerMark === answer._id &&
                    <AnswersMarkServiceMenu answer={answer} />
                }
            </div>
        </div>
    );
};
