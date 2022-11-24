import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from 'store/hook';
import { selectCurrentUser, IUser } from 'store/slices/auth';

export const AuthPage = () => {
    const navigate = useNavigate();
    const user = useAppSelector<IUser>(selectCurrentUser);
    const { pathname } = useLocation();

    useEffect(() => {
        user.id &&
            navigate("/dashboard/todos", { replace: true });
    }, [user.id, navigate]);

    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">
                <nav className="header">
                    <div></div>

                    <div>
                        { pathname === '/' || pathname ==='/login'
                            ? <p><Link to="signup">Sign up</Link></p>
                            : <p><Link to="login">Login</Link></p>
                        }
                    </div>
                </nav>
                <article className="content">
                    <Outlet />
                </article>
                <footer className="footer">
                    <p>vlad pischaeff &copy; 2022</p>
                </footer>
            </section>
        </>
    );
};
