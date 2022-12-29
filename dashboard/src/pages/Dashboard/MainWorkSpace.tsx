import React from 'react';
import { Services } from 'pages/Dashboard/Services';

import s from './MainWorkSpace.module.sass'

export const MainWorkSpace = () => {
    return (
        <div className={s.WorkSpace}>
            <div className={s.LeftWorkSpace}>
                <Services />
            </div>
            <div className={s.RightWorkSpace}>
                Right
            </div>
        </div>
    );
};
