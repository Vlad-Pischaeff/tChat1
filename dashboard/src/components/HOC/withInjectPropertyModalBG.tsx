import React from "react";
import s from './hocStyles.module.sass';

interface iExtraProperty {
    userProperty: 'alias' | 'greeting';
}

export function withInjectPropertyModalBG<T extends iExtraProperty>(
        WrappedComponent: React.ComponentType<T>
    ){
    const NewComp = (props: T) => {
        return (
            <div className={s.ModalWrap}>
                <div className={s.ModalBG}></div>
                <div className={s.ModalComponentContainer}>
                    <WrappedComponent { ...(props as T)} />
                </div>
            </div>
        )
    };

    return NewComp;
}
