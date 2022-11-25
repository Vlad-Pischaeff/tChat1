import React, { HTMLAttributes, PropsWithChildren }  from 'react';
import s from './CheckBox.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    checked: boolean,
    onChange: () => void,
    idx: number
}

export const CheckBox: React.FC<PropsWithChildren<iProps>> = ({ checked, idx, onChange }) => {
    return (
        <div className={s.container}>
            <input type="checkbox" id={`cb-${idx}`} checked={checked} onChange={onChange} />
            <label htmlFor={`cb-${idx}`} className={s.checkbox} />
        </div>
    );
};
