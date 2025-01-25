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
function getEmptyNote(txt, type = 'text') {
     switch (type) {
        case 'text':
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
            
            break;
            case 'video':
                return {
                    id: '',
                    createdAt: 'now',
                    type,
                    isPinned: false,
                    style: {
                    backgroundColor: 'white'
                    },
                    info: {
                    url: txt
                    }
                }
                
                break;
            case 'image':
                return {
                    id: '',
                    createdAt: 'now',
                    type,
                    isPinned: false,
                    style: {
                    backgroundColor: 'white'
                    },
                    info: {
                    src: txt
                    }
                }
                
                break;
        default:
            break;
     }
    
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createNote('Need to buy - Milk, Eggs, Bread, Apples, Chicken"'),
            _createNote('Discuss project roadmap and timelines.'),
            _createNote('https://www.youtube.com/embed/VqhCQZaH4Vs', 'video'),
            _createNote('Workout plan: Push-ups, Squats, Running, Bicep curls, 30 mins daily.'),
            _createNote('Movie night ideas: Inception, The Matrix, Interstellar, The Prestige.'),
            _createNote('https://www.youtube.com/embed/4dPRGfGmCmU', 'video'),
            _createNote('Travel plans for Japan: Visit Kyoto, Osaka, Tokyo. Dont forget the bullet train pass!'),
            _createNote('Birthday ideas for Sarah: Surprise party with cake, friends, and decorations. Get her a scarf.'),
            _createNote('https://www.youtube.com/embed/LOwvDHAF5II', 'video'),
            _createNote('Weekend hiking trip: Pack water, snacks, first aid kit. Check weather forecast.'),
            _createNote('Tell Hoshen and Bar they are awsome'),
            _createNote('Call Jessica, Discuss marketing strategy, share the new pitch deck. '),
            _createNote('https://www.youtube.com/embed/IC5PL0XImjw', 'video'),
            _createNote('Guitar practice routine: Learn new chords, play 3 songs, 30 mins daily.'),
            _createNote('Research on AI in healthcare'),
            _createNote('imgs/flower.JPG', 'image'),
            _createNote('Recipes to try this month: Spaghetti Carbonara, Avocado Toast, Homemade Pizza.'),
            _createNote('Meeting with marketing team: Discuss social media strategy, email marketing campaigns.'),
            _createNote('Repaint the living room, install new lighting in the kitchen.'),
            _createNote('https://www.youtube.com/embed/SyQ-TgA6bQk', 'video'),
            _createNote('Plan vacation to Hawaii: Book flight tickets, find best hotel in Honolulu, pack swimwear.'),
            _createNote('https://www.youtube.com/embed/5LN6AW5QifI', 'video'),
            _createNote('Dinner with the family: Order pizza, watch a movie together, catch up with everyone.'),
            _createNote('Yoga class schedule: Monday: Hatha Yoga, Wednesday: Vinyasa Flow, Friday: Restorative.'),
            _createNote('https://www.youtube.com/embed/adLGHcj_fmA', 'video'),
            _createNote('Prepare taxes for 2024: '),
            _createNote('Buy wedding gift, write a thoughtful card, RSVP by the 25th.'),
            _createNote('https://www.youtube.com/embed/bdneye4pzMw', 'video'),
            _createNote('Build a bookshelf, gather materials, follow YouTube tutorial.'),
            _createNote('Dog check-up appointment and vaccinations updated.'),
            _createNote('https://www.youtube.com/embed/qI-t1I_ppL8', 'video'),
            _createNote('Invite friends over, bring board games, snacks, and drinks'),
            _createNote('I like react'),
            _createNote('Hoshen and Bar are awsome'),
            _createNote('imgs/image.JPG', 'image')

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

 



