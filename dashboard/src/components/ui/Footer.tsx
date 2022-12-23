import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import s from './Footer.module.sass';

export const Footer = () => {
    return (
        <footer className={s.Footer}>
            <div className={s.FooterContainer}>
                <p className={s.FooterCopyright}>vlad pischaeff &copy; 2022</p>
            </div>
            <div className={s.FooterContainer}>
                <ThemeToggle />
            </div>
        </footer>
    );
};
