import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from 'store/hook';
import { logout } from 'store/slices/auth';
import s from './Header.module.sass';

export const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handlerLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    }

    return (
        <nav className={s.flexHeader}>

            <div>
                { pathname.match(/dashboard/i) &&
                    <p>Dashboard</p>
                }
            </div>

            <div>
                { (pathname === '/' || pathname ==='/login') &&
                    <p><Link to="signup">Sign up</Link></p>
                }
                { pathname === '/signup' &&
                    <p><Link to="login">Login</Link></p>
                }
                { pathname === '/restore' &&
                    <p><Link to="login">Back</Link></p>
                }
                { pathname.match(/dashboard/i) &&
                    <p onClick={handlerLogout}><Link to="">Logout</Link></p>
                }
            </div>
        </nav>
    );
};
