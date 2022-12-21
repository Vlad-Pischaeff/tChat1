import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from 'store/hook';
import { logout } from 'store/slices/auth';
import { selectUI, setTheme, UIType } from 'store/slices/ui';
import { changeTheme } from 'assets/style/utils';
import { tUser } from 'store/api/apiTypes';
import s from './Header.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    data?: tUser | undefined,
}

export const Header = ({ data }: iProps) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const ui = useAppSelector<UIType>(selectUI);
    console.log('pathname..', pathname)
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
                { (pathname === '/' || pathname ==='/login') &&
                    <p><Link to="signup">Sign up</Link></p>
                }
                { pathname === '/signup' &&
                    <p><Link to="login">Login</Link></p>
                }
                { pathname.match(/dashboard/i) &&
                    <>
                        <p onClick={handlerColors}>Theme</p>
                        <p onClick={handlerLogout}><Link to="">Logout</Link></p>
                    </>
                }
            </div>
        </nav>
    );
};
