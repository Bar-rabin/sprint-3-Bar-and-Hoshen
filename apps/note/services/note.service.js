// note service

import { storageService } from '../../../services/storage.service.js'
import { async } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    // getFilterFromSearchParams,
    
}


// crud func
function query(filterBy = {}) {
    return async.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.txt))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type >= filterBy.type)
            }
            console.log(notes)
            return notes
        })
}

function get(noteId) {
    return async.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return async.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return async.put(NOTE_KEY, note)
    } else {
        return async.post(NOTE_KEY, note)
    }
}


// filter creation
function getDefaultFilter() {
    return {
        txt: '',
        type: '',
    }
}


//notes creation
function getEmptyNote(txt, type) {
    return {
        id: '',
        createdAt: 'now',
        type,
        isPinned: false,
        style: {
        backgroundColor: 'white'
        },
        info: {
        txt
        }
    }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createNote('Hello there'),
            _createNote('Remember to Insert text'),
            _createNote('I like react'),
            _createNote('Hoshen and Bar are awsome'),
            _createNote('Hello there'),
            _createNote('Remember to Insert text'),
            _createNote('I like react'),
            _createNote('Hoshen and Bar are awsome'),
            _createNote('Hello there'),
            _createNote('Hello there'),
            _createNote('Remember to Insert text'),
            _createNote('I like react'),
            _createNote('Hoshen and Bar are awsome'),
            _createNote('Hello there'),
            _createNote('Remember to Insert text'),
            _createNote('I like react'),
            _createNote('Hoshen and Bar are awsome'),
            _createNote('Remember to Insert text'),
            _createNote('I like react'),
            _createNote('Hoshen and Bar are awsome'),
            _createNote('Hello there'),
            _createNote('Remember to Insert text'),
            _createNote('I like react'),
            _createNote('Hoshen and Bar are awsome'),
        ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}
 
function _createNote(txt = 'Insert text', type = 'text') {
    const note = getEmptyNote(txt, type)
    console.log(note)
    note.id = utilService.makeId()
    return note
}


// function getFilterFromSearchParams(searchParams) {
//     const txt = searchParams.get('txt') || ''
//     const minSpeed = searchParams.get('minSpeed') || ''
//     return {
//         txt,
//         minSpeed
//     }
// }

 



