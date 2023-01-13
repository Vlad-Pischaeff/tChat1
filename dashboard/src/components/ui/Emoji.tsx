import React from 'react';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    symbol: string,
    label?: string,
    className: string,
}

export const Emoji = (props: iProps) => (
    <span
        className={props.className}
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);
