import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { useAppSelector } from 'store/hook';
import { selectUI, UIType } from "store/slices/ui";
import s from './SnackBar.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    message?: string | undefined
}

export const SnackBar: React.FC<PropsWithChildren<iProps>> = () => {
    const ui = useAppSelector<UIType>(selectUI);

    if (ui.message) {
        return (
            <div className={s.container}>
                <div className={s.message}>
                    {ui.message}
                </div>
            </div>
        );
    } else {
        return null;
    }
};
