import React from 'react';
import s from './OpenEditorIcon.module.sass';

export const OpenEditorIcon = ({ active }: { active?: boolean}) => (
    <div className={`${s.svg} ${active ? s.active : ''}`}>
        <svg className={s.fillStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <g id="x0020_10">
                <path className={`${s.strokeStyle} ${active ? s.active : ''}`} d="M44.34375,2c-0.94141,0 -1.91016,0.34766 -2.625,1.0625l-1.34375,1.375l5.1875,5.1875c-0.00391,0.00391 1.375,-1.34375 1.375,-1.34375c1.43359,-1.43359 1.43359,-3.78516 0,-5.21875c-0.71875,-0.71875 -1.65234,-1.0625 -2.59375,-1.0625zM38.75,5.9375l-22.71875,22.71875l-0.0625,0.3125l-0.9375,4.84375l-0.3125,1.46875l1.46875,-0.3125l4.84375,-0.9375l0.3125,-0.0625l22.71875,-22.71875l-1.4375,-1.40625l-22.25,22.21875l-2.4375,-2.4375l22.21875,-22.25zM3,10c-0.55469,0 -1,0.44922 -1,1v36c0,0.55078 0.44531,1 1,1h36c0.55469,0 1,-0.44922 1,-1v-29l-2,2v26h-34v-34h26l2,-2z"></path>
            </g>
        </svg>
    </div>
);
