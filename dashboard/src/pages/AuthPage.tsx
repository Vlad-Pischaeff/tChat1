import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import { useAppSelector } from '../store/hook';
import { selectCurrentUser, IUser } from '../store/slices/auth';
import { useGetUserQuery } from '../store/api/usersApi';

export const AuthPage = () => {
    const [ skip, setSkip ] = useState<boolean>(true);
    const user = useAppSelector<IUser>(selectCurrentUser);
    const { data, error, isLoading } = useGetUserQuery(user.id, { skip });

    useEffect(() => {
        user.id && 
            setSkip(false);
    }, [user.id, setSkip]);

    console.log('AuthPage..data..', data, skip);

    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">
                <nav className="header">
                    <div>
                        { data && <img src={data.photo} alt="avatar" /> }
                        { data && <p>{data.name}</p> }
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