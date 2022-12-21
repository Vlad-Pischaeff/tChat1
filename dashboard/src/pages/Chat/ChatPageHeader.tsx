import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from 'store/hook';
import { logout } from 'store/slices/auth';
import { selectUI, setTheme, UIType } from 'store/slices/ui';
import { changeTheme } from 'assets/style/utils';
import { tUser } from 'store/api/apiTypes';
import s from './Chat.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    data: tUser | undefined,
}

export const ChatPageHeader = ({ data }: iProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const ui = useAppSelector<UIType>(selectUI);

    const handlerLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    }

    const handlerColors = () => {
        if (ui.theme === 'dark') {
            changeTheme('light');
            dispatch(setTheme('light'));
        } else {
            changeTheme('dark');
            dispatch(setTheme('dark'));
        }
    }

    return (
        <nav className={s.flexHeader}>
            <div>
                { data &&
                    <>
                        <img src={data.photo} className={s.userImage} alt="avatar" />
                        <p>{data.name}</p>
                    </>
                }
            </div>

            <div>
                <p onClick={handlerColors}>Theme</p>
                <p onClick={handlerLogout}><Link to="">Logout</Link></p>
            </div>
        </nav>
    );
};
