import React from 'react';
import { Outlet, Link } from "react-router-dom";

export const AuthPage = () => {
    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">
                <header className="header">
                    <p><Link to="login">Login</Link></p>
                    <p><Link to="signup">Sign up</Link></p>
                </header>
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