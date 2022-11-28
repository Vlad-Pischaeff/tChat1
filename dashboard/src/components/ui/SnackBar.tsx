import React, { HTMLAttributes } from 'react';
import { Snack } from './Snack';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    message: string
}

export const SnackBar = ({ message }: iProps) => {

    return message
        ?   <Snack message={message} />
        :   null;
};
