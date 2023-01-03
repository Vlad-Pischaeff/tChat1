import React, { useEffect } from 'react';
import { useAppDispatch } from 'store/hook';
import { useNotesQuery} from 'store/api/notesApi';
import { setServicesModal, eModal } from "store/slices/ui";
import s from './Notes.module.sass';
import { NotesAddForm } from './NotesAddForm';

export const Notes = () => {
    const dispatch = useAppDispatch();
    const { refetch, data, isSuccess, isLoading } = useNotesQuery('');

    useEffect(() => {
        refetch();
        // eslint-disable-next-line
    }, []);

    const openModal = () => {
        dispatch(setServicesModal(eModal.note));
    }
    console.log('notes...', data)
    return (
        <>
            <input type="button" className={s.AddItem} value="+ add note" onClick={openModal} />

            <NotesAddForm />

            <div className={s.Main}>
                { data && data.length === 0 &&
                    <div className={s.MainPlaceholder}>
                        <p>No notes...</p>
                    </div>
                }
                { isSuccess && data &&
                    data.map(note =>
                        <div key={note._id}>{note.title} {note.description}</div>
                    )
                }
                { isLoading && <div>Loading...</div>}
            </div>

            <div className={s.Footer}>
                Notes service footer
            </div>
        </>
    );
};
