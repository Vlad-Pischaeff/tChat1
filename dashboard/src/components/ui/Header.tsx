import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from 'store/hook';
import { logout } from 'store/slices/auth';
import { selectUI, setTheme } from 'store/slices/ui';
import { changeTheme } from 'assets/style/utils';
import s from './Header.module.sass';

export const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);

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

            <div><p>Dashboard</p></div>

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
