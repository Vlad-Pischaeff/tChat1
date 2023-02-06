import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIServices } from "store/slices/ui";
import { BODY_OBJ } from './ServicesVariables';
import s from './Services.module.sass';

export const ServicesBody = () => {
    const services = useAppSelector(selectUIServices);

    return (
        <div className={s.body}>
            { BODY_OBJ[services]() }
        </div>
    );
};
