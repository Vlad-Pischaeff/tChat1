import React from 'react';
import { Snack } from './Snack';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string
}

export const SnackBar = ({ message }: iProps) => {

    return message
        ?   <Snack message={message} />
        :   null;
};
