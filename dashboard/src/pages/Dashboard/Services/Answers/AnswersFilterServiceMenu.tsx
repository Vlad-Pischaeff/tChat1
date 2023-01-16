import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setItemServiceMenu, setAnswersFilterIcon } from "store/slices/ui";
import { SYMBOLS } from './AnswersVariables';
import s from '../Services.module.sass';

export const AnswersFilterServiceMenu = () => {
    const dispatch = useAppDispatch();

    const handlerSelectColor = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setAnswersFilterIcon(e.currentTarget.id));
        handlerHideMenu();         // ✅ hide menu after filtering
    }

    const handlerHideMenu = () => {
        dispatch(setItemServiceMenu(null));
    }

    return (
        <div className={s.ServiceMenuContainer}>
            <div className={s.ServiceMenuBG} onClick={handlerHideMenu}></div>

            <div className={s.ServiceMenuFooterWrap} role="menu">
                <div
                    id='none'
                    className={s.ServiceMenuItem}
                    role="menuitem"
                    onClick={handlerSelectColor}
                >
                    Show all...
                </div>
                <div className={s.ServiceMenuFooterGrid}>
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
        </div>
    );
};
