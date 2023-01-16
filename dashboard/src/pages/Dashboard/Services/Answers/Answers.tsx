import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { setItemServiceMenu, setServicesModal, selectUI, eModal } from "store/slices/ui";
import { useAnswersQuery } from 'store/api/answersApi';
import { AnswersAddForm } from './AnswersAddForm';
import { AnswersItem } from './AnswersItem';
import { AnswersFilterServiceMenu } from './AnswersFilterServiceMenu';
import s from '../Services.module.sass';

export const Answers = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    const { refetch, data, isSuccess, isLoading } = useAnswersQuery('');

    useEffect(() => {
        refetch();
        // eslint-disable-next-line
    }, []);

    const openModal = () => {
        dispatch(setServicesModal(eModal.answer));
    }

    const handlerShowFilterMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setItemServiceMenu({ answersFilter: 'none' }));
    }

    return (
        <>
            <input type="button" className={s.AddItem} value="+ add answer" onClick={openModal} />

            <AnswersAddForm />

            <div className={s.Main} role='list'>
                { data && data.length === 0 &&
                    <div className={s.MainPlaceholder}>
                        <p>No answers/questions...</p>
                    </div>
                }
                { isSuccess && data &&
                    data.map(answer =>
                        <div key={answer._id} role='listitem'>
                            <AnswersItem answer={answer} />
                        </div>
                    )
                }
                { isLoading && <div>Loading...</div>}
            </div>

            <div className={s.Footer}>
                <p>Filter answers by label</p>

                <div className={s.FooterText} onClick={handlerShowFilterMenu}>
                    Select...
                </div>

                { ui.serviceMenu.answersFilter !== false &&
                    <AnswersFilterServiceMenu />
                }
            </div>
        </>
    );
};
