import React from 'react';
import { useEditNoteMutation} from 'store/api/notesApi';
import { iNotes } from 'store/api/apiTypes';
import * as ICONS from 'assets/img';
import s from './Notes.module.sass';

const COLORS: Record<string, string> = {
    'none': 'none',
    'orange': 'orange',
    'tomato': 'tomato',
    'dark red': 'darkred',
    'lawn green': 'lawngreen',
    'aqua': 'aqua',
    'gray': 'gray',
};

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    note: iNotes,
    showMenu: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const NotesMarkServiceMenu = ({ note, showMenu }: iProps) => {
    const [ updateNote ] = useEditNoteMutation();

    const handlerSelectColor = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const body = { type: e.currentTarget.id };
        const data = { id: note._id, ...body };
        updateNote(data);
        showMenu(e);
    }

    return (
        <div className={s.ServiceMenuWrap} role="menu">
            { Object.entries(COLORS).map(([key, value]) =>
                    <div key={key} id={value}
                        className={s.ServiceMenuItem}
                        role="menuitem"
                        onClick={handlerSelectColor}
                    >
                        <ICONS.LabelIcon fill={value} />
                        <p>{key}</p>
                    </div>
                )
            }
        </div>
    );
};
