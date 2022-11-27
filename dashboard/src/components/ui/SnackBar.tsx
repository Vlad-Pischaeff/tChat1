import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { useAppSelector } from 'store/hook';
import { selectUI } from "store/slices/ui";
import { Snack } from './Snack';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    message?: string | undefined
}

export const SnackBar: React.FC<PropsWithChildren<iProps>> = ({ message }) => {
    const ui = useAppSelector(selectUI);

    return (message || ui.message)
        ?   <Snack message={ message ? message : ui.message } />
        :   null;
};
