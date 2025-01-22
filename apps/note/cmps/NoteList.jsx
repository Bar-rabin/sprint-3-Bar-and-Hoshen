const { Link } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouterDOM
import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onRemoveNote }) {
    const navigate = useNavigate()
    function onEditNote() {
        // ev.preventDefault()
        navigate(`/note/edit`)
    }
    
    

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
            <div className="add-logo">
                <img src="/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" alt="" onClick={onEditNote}/>
            </div>
        </ul >
    )

}




