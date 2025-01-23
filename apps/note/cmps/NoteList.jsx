const { Link } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouterDOM
import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onRemoveNote }) {
    const navigate = useNavigate()
    function onAddNote() {
        // ev.preventDefault()
        navigate(`/note/edit`)
    }

    function onEditNote(id) {
        // ev.preventDefault()
        navigate(`/note/edit/${id}`)
    }
    

    return (
        <ul className="note-ul">
            {notes.map(note =>
            <div className="note-cont" style={note.style} onClick={()=> onEditNote(note.id)}>
                    <section>
                        <button className="posd-button" onClick={() => onRemoveNote(note.id)}>X</button>
                    </section>

                < li key={note.id}  className="clean-list flex  note" >
                    <NotePreview note={note} />
                </li>
            </div>
            )
            }
            <div className="add-logo">
                <img src="/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" alt="" onClick={onAddNote}/>
            </div>
        </ul >
    )

}




