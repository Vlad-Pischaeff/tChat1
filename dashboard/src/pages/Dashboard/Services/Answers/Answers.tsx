import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { setItemServiceMenu, setServicesModal, selectUI, eModal } from "store/slices/ui";
import { useAnswersQuery } from 'store/api/answersApi';
import { AnswersAddForm } from './AnswersAddForm';
import { AnswersItem } from './AnswersItem';
import { AnswersFilterServiceMenu } from './AnswersFilterServiceMenu';
import { Editor } from '../Editor';
import { SYMBOLS_OBJ } from './AnswersVariables';
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

    const filterData = () => {
        if (isSuccess && data) {
            let filteredData = data;

            if (ui.answersFilterIcon !== 'none') {
                filteredData = data.filter(answer => answer.type === ui.answersFilterIcon);
            }

            return filteredData.map(answer =>
                <div key={answer._id} role='listitem'>
                    <AnswersItem answer={answer} />
                </div>
            )
        }
    }

    return (
        <>
            <input type="button" className={s.AddItem} value="+ add answer" onClick={openModal} />

            { ui.servicesModal === eModal.answer &&
                <AnswersAddForm />
            }

            { ui.servicesModal === eModal.editor &&
                <Editor />
            }

            <div className={s.Main} role='list'>
                { data && data.length === 0 &&
                    <div className={s.MainPlaceholder}>
                        <p>No answers/questions...</p>
                    </div>
                }

                { filterData() }

                { isLoading && <div>Loading...</div>}
            </div>

            <div className={s.Footer}>
                <span>Filter answers by &nbsp;</span>
                <span>
                    { ui.answersFilterIcon === 'none'
                        ? 'none'
                        : SYMBOLS_OBJ[ui.answersFilterIcon]()
                    }
                </span>

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
