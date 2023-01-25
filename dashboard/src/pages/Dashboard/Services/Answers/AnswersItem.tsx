import React from 'react';
import parse from 'html-react-parser';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUIServiceMenu, setItemServiceMenu } from "store/slices/ui";
import { iAnswers } from 'store/api/apiTypes';
import { AnswersServiceMenu } from './AnswersServiceMenu';
import { AnswersMarkServiceMenu } from './AnswersMarkServiceMenu';
import { removeContentEditableAttr } from 'assets/utils';
import * as ICONS from 'assets/icons';
import { SYMBOLS_OBJ } from './AnswersVariables';
import s from '../Services.module.sass';

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    answer: iAnswers
}

export const AnswersItem = ({ answer }: iProps) => {
    const dispatch = useAppDispatch();
    const serviceMenu = useAppSelector(selectUIServiceMenu);

    const showMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu({ answerActions: answer._id }));
    }

    const sendAnswer = () => {
        // TODO add logic
    }

    return (
        <div className={s.Summary}>
            <div className={s.SummaryContainer}>
                <p className={s.itemIcon}>{SYMBOLS_OBJ[answer.type]()}</p>
                <div className={s.answerDesc}>{parse(removeContentEditableAttr(answer.description))}</div>

                <div className={s.SummaryMenu} onClick={showMenu}>
                    <ICONS.ServiceMenuIcon />
                </div>

                <div className={s.SummaryMenu} onClick={sendAnswer}>
                    <ICONS.SendIcon />
                </div>
                { serviceMenu.answerActions === answer._id &&
                    <AnswersServiceMenu answer={answer} />
                }

                { serviceMenu.answerMark === answer._id &&
                    <AnswersMarkServiceMenu answer={answer} />
                }
            </div>
        </div>
    );
};
