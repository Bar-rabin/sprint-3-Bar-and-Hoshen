import { noteService } from "../services/note.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React
export function NoteTxt() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const { noteId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (noteId) loadNote()
    }, [])


    function loadNote() {
        noteService.get(noteId)
            .then(setNoteToEdit)
            .catch(err => {
                console.log('Problem getting note', err)
                navigate('/note')
            })
    }


    function handleChange({ target }) {
        console.log(target)
       
        let {value} = target

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        console.log(value)
        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: {...prevNote.info, [target.name]: value }
            }))
        console.log(noteToEdit)
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(note => {
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                navigate('/note')
            })
    }


    const { info } = noteToEdit
    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote}>
                <input className="text-box" value={info.txt} onChange={handleChange} type="text" name="txt" id="txt" />
                <button>Save</button>
            </form>
        </section>
    )

}