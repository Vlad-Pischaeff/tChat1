import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUI } from "store/slices/ui";
import { BODY_OBJ } from './ServicesVariables';
import s from './Services.module.sass';

export const ServicesBody = () => {
    const ui = useAppSelector(selectUI);

    return (
        <div className={s.body}>

            { BODY_OBJ[ui.services]() }

        </div>
    );
};
