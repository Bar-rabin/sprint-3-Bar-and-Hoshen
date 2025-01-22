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
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
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
            <h1>{noteToEdit.id ? 'Edit' : 'Add'} Note</h1>
            <form onSubmit={onSaveNote}>
                <label htmlFor="txt">text</label>
                <input value={info.txt} onChange={handleChange} type="text" name="txt" id="txt" />
                <button>Save</button>
            </form>
        </section>
    )

}