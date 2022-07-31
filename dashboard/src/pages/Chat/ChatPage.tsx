import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { selectCurrentUser, IUser, logout } from '../../store/slices/auth';
import { useGetUserQuery, useLazyUsersQuery } from '../../store/api/usersApi';

export const ChatPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector<IUser>(selectCurrentUser);
    const { data, error, isLoading } = useGetUserQuery(user.id, { skip: !user.id });
    const [ trigger ] = useLazyUsersQuery();

    console.log('ChatPage..data..', data, user.id);
    
    const handlerLogout = () => {
        dispatch(logout());
        navigate("/", { replace: true });
    }

    const handlerGetUsers = async () => {
        console.log('query1..', trigger);
        const data = await trigger('', false);
        if ( data.status === "rejected") {
            navigate("/logout", { replace: true });
        }
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
                    <input type="button" value="Get users" onClick={handlerGetUsers}/>
                    <Outlet />
                </article>
                <footer className="footer">
                    <p>vlad pischaeff &copy; 2022</p>
                </footer>
            </section>
        </>
    );
};