import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React

export function NoteIndex() {
    //states
    const [ notes, setNotes ] = useState([])
    // const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    //funcs
    useEffect(() => {
        noteService.query()
            .then(setNotes)
            .catch(err => {
                console.log('problem getting notes')
            })
    }, [])

    // function onSetFilterBy(newFilter) { 
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    // }

    return <div><NoteList notes={notes} /></div>
}
