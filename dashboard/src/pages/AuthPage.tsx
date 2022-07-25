import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/auth';

export const AuthPage = () => {
    const user = useSelector(selectCurrentUser);

    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">
                <nav className="header">
                    <div>
                        <img src={user.photo} alt="avatar" />
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <p><Link to="login">Login</Link></p> 
                        <p><Link to="signup">Sign up</Link></p>
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