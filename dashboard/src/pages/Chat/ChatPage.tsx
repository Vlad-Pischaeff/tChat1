import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { selectCurrentUser, IUser, logout } from '../../store/slices/auth';
import { useGetUserQuery } from '../../store/api/usersApi';

export const ChatPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector<IUser>(selectCurrentUser);
    const { data, error, isLoading } = useGetUserQuery(user.id, { skip: !user.id });

    console.log('ChatPage..data..', data);
    
    const handlerLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    }

    return (
        <>
            <aside className="aside"></aside>
            <section className="layout">
                <nav className="header">
                    <div>
                        { data && 
                            <>
                                <img src={data.photo} alt="avatar" />
                                <p>{data.name}</p>
                            </>
                        }
                    </div>

                    <div>
                        <p onClick={handlerLogout}><Link to="">Logout</Link></p>
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