import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { NoteHeader } from "../cmps/NotesHeader.jsx"
import { NoteNavBar } from "../cmps/NoteNavBar.jsx"
const { useState, useEffect } = React

export function NoteIndex() {
    //states
    const [notes, setNotes] = useState([])
    // const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    //funcs
    useEffect(() => {
        noteService.query()
            .then(setNotes)
            .catch(err => {
                console.log('problem getting notes')
            })
    }, [])
    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
                showSuccessMsg(`Car removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Problems removing note (${noteId})`)
            })
    }
    // function onSetFilterBy(newFilter) { 
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    // }

    return <div className="main-note-page">
        <NoteHeader className="header" />
        <NoteNavBar />
        <NoteList notes={notes} onRemoveNote={onRemoveNote} className="note"/>

    </div>
}
