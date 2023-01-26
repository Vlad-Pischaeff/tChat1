import React from 'react';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { useNotesQuery} from 'store/api/notesApi';
import { setItemServiceMenu, setServicesModal, eModal, selectUI } from "store/slices/ui";
import { NotesAddForm } from './NotesAddForm';
import { NotesEditor } from './NotesEditor';
import { NotesItem } from './NotesItem';
import { NotesFilterServiceMenu } from './NotesFilterServiceMenu';
import * as ICONS from 'assets/icons';
import s from '../Services.module.sass';

export const Notes = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);
    // eslint-disable-next-line
    const { refetch, data, isSuccess, isLoading } = useNotesQuery('');

    // useEffect(() => {
    //     refetch();
    //     // eslint-disable-next-line
    // }, []);

    const openModal = () => {
        dispatch(setServicesModal(eModal.note));
    }

    const handlerShowFilterMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setItemServiceMenu({ notesFilter: 'none' }));
    }

    const filterData = () => {
        if (isSuccess && data) {
            let filteredData = data;

            if (ui.notesFilterColor !== 'none') {
                filteredData = data.filter(note => note.type === ui.notesFilterColor);
            }

            return filteredData.map(note =>
                <div key={note._id} role='listitem'>
                    <NotesItem note={note} />
                </div>
            )
        }
    }

    return (
        <>
            <input type="button" className={s.AddItem} value="+ add note" onClick={openModal} />

            { ui.servicesModal === eModal.note &&
                <NotesAddForm />
            }

            { ui.servicesModal === eModal.editor &&
                <NotesEditor />
            }

            <div className={s.Main} role='list'>
                { data && data.length === 0 &&
                    <div className={s.MainPlaceholder}>
                        <p>No notes...</p>
                    </div>
                }

                { filterData() }

                { isLoading && <div>Loading...</div>}
            </div>

            <div className={s.Footer}>
                <p>Filter notes by label</p>

                <div className={s.FooterIcon} onClick={handlerShowFilterMenu}>
                    <ICONS.LabelIcon fill={ui.notesFilterColor} />
                </div>

                { ui.serviceMenu.notesFilter !== false &&
                    <NotesFilterServiceMenu />
                }
            </div>
        </>
    );
};
