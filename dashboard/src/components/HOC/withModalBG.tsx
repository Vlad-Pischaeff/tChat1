import React from "react";
import s from './hocStyles.module.sass';

export const withModalBG = <T extends JSX.IntrinsicElements>(Component: React.ComponentType<T>) => {
    const NewComp = (props: Omit<T, keyof JSX.IntrinsicElements>) => {
        return (
            <div className={s.ModalWrap}>
                <div className={s.ModalBG}></div>
                <div className={s.ModalComponentContainer}>
                    <Component { ...(props as T) } />
                </div>
            </div>
        )
    };

    return NewComp;
}
