import { LongTxt } from "./LongTxt.jsx"
const { useNavigate, useParams } = ReactRouterDOM
export function NotePreview({ note }) {
    const navigate = useNavigate()
    
    function onEditNote() {
        // ev.preventDefault()
        navigate(`/note/${note.id}`)
    }
const {info} = note
    return (
        <article className="Note-preview" onClick={onEditNote}>
       <LongTxt txt={info.txt} />
        </article>
    )
}