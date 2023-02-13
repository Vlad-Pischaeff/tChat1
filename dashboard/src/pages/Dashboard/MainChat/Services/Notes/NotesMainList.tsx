import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUIState } from 'store/slices/ui';
import { useNotesQuery } from 'store/api/notesApi';
import { NotesItem } from './NotesItem';
import s from '../Services.module.sass';

export const NotesMainList = () => {
    const notesFilterColor = useAppSelector(selectUIState('notesFilterColor'));
    const { data, isSuccess, isLoading } = useNotesQuery('');

    const filterData = () => {
        if (isSuccess && data) {
            let filteredData = data;

            if (notesFilterColor !== 'none') {
                filteredData = data.filter(note => note.type === notesFilterColor);
            }

            return filteredData.map(note =>
                <div key={note.id} role='listitem'>
                    <NotesItem note={note} />
                </div>
            )
        }
    }

    return (
        <div className={s.Main} role="list">
            { data && data.length === 0 &&
                <div className={s.MainPlaceholder}>
                    <p>No notes...</p>
                </div>
            }

            { filterData() }

            { isLoading && <div>Loading...</div>}
        </div>
    );
};
