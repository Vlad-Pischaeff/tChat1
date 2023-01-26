import React from 'react';
import s from './StyleTypeO.module.sass';

export const DblArrowLeft = ({ active }: { active: boolean}) => (
    <div className={`${s.svg} ${active ? s.active : ''}`}>

    </div>
);
