import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setItemServiceMenu } from "store/slices/ui";
import s from './hocStyles.module.sass';

interface iProps {
    closeMenu: (e: React.MouseEvent<HTMLDivElement>) => void,
}

export const withHiddenMouseClickArea = <T,>(ChildComp: React.ComponentType<T>) => {

    const NewComp = (props: Omit<T, keyof iProps>) => {
        const dispatch = useAppDispatch();

        const handlerHideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            dispatch(setItemServiceMenu(null));
        }

        return (
            <div className={s.ServiceMenuContainer}>
                <div className={s.ServiceMenuBG} onClick={handlerHideMenu}></div>

                <ChildComp { ...(props as T) } closeMenu={handlerHideMenu} />
            </div>
        );
    }

    return NewComp;
}
