import React from "react";
import s from './hocStyles.module.sass';

export function withModalBG<T extends JSX.IntrinsicElements>(WrappedComponent: React.ComponentType<T>) {
    return function WithBG(props: Omit<T, keyof JSX.IntrinsicElements>): JSX.Element {
        return (
            <div className={s.ModalWrap}>
                <div className={s.ModalBG}></div>
                <WrappedComponent { ...(props as T) } />
            </div>
        )
    };
}
