import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { Snack } from './Snack';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    message: string
}

export const SnackBar: React.FC<PropsWithChildren<iProps>> = ({ message }) => {

    return message
        ?   <Snack message={message} />
        :   null;
};
