import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUIHiddenPanelServices, setHiddenPanelServices } from 'store/slices/ui';
import { Services } from 'pages/Dashboard/MainChat/Services';
import * as ICON from 'assets/icons';
import s from './MainWorkSpace.module.sass';

export const MainWorkSpace = () => {
    const dispatch = useAppDispatch();
    const hiddenPanelServices = useAppSelector(selectUIHiddenPanelServices);

    const showPanelServices = () => {
        dispatch(setHiddenPanelServices(false));
    }

    return (
        <div className={hiddenPanelServices ? s.WorkSpaceFull : s.WorkSpaceSplited}>

            { hiddenPanelServices
                ? (
                    <div className={s.ShowServiceMenuButton} onClick={showPanelServices}>
                        <ICON.DblArrowLeft />
                    </div>
                )
                : (
                    <div className={s.LeftWorkSpace}>
                        <Services />
                    </div>
                )
            }

            <div className={s.RightWorkSpace}>
                <p>Right workspace...</p>
            </div>
        </div>
    );
};
