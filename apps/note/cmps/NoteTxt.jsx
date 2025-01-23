import { noteService } from "../services/note.service.js"
import { ColorInput } from "./ColorInput.jsx"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteTxt() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const { noteId } = useParams()
    const navigate = useNavigate()
    const [noteStyle, setNoteStyle] = useState({
        backgroundColor: 'white'
    })

    useEffect(() => {
        
        if (noteId) loadNote()
            
    }, [])

//load and set
    function loadNote() {
        noteService.get(noteId)
            .then(setNoteToEdit)
            
            .catch(err => {
                console.log('Problem getting note', err)
                navigate('/note')
            })
    }

    function onSetNoteStyle(noteStyle) {
        setNoteStyle(prevNoteStyle => ({ ...prevNoteStyle, ...noteStyle }))
        setNoteToEdit(prevNote => ({
            ...prevNote,
            style: { ...noteStyle }
        }))

    }

    //edit
    function handleChange({ target }) {
        console.log(target)

        let { value } = target

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        console.log(noteStyle)
        setNoteToEdit(prevNote => ({
            ...prevNote,

            info: { ...prevNote.info, [target.name]: value }
        }))
        console.log(noteToEdit)

    }


// save
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

    //elements
   const {info} = noteToEdit
    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote}>
                <input className="text-box" value={info.txt} onChange={handleChange} type="text" name="txt" id="txt" />
                <div className="color-picker">
                    <ColorInput {...noteStyle} onSetNoteStyle={onSetNoteStyle} />
                </div>
                <button>Save</button>
            </form>
        </section>
    )

}