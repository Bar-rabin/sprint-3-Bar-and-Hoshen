const { Link } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onRemoveNote }) {
    
   

   
    return (
        <ul className="flex">
            {notes.map(note =>
                < li key={note.id} className="clean-list flex note" >
            <NotePreview note={note} />
            <section>
                <button className="posd-button" onClick={() => onRemoveNote(note.id)}>x</button>
            </section>
        </li>
    )
}
        
        </ul >
    )
    
}




