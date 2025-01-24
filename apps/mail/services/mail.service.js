// mail service

import { async } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams,
    getEmptyMailToSend
}

function query(filterBy) {
    console.log(filterBy)
    return async.query(MAIL_KEY)
        .then(mails => {

            mails = mails.filter(mail => mail.from === filterBy.from)
            return mails
        })
}

function get(mailId) {
    return async.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return async.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return async.put(MAIL_KEY, mail)
    } else {
        return async.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', body = '', isRead = false) {
    return {
        id: '',
        createdAt: new Date(Date.now()).toLocaleDateString(),
        subject,
        body,
        isRead,
        sentAt: null,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'momo@momo.com'


    }
}
function getEmptyMailToSend(subject = '', body = '', isRead = false) {
    return {
        id: '',
        createdAt: new Date(Date.now()).toLocaleDateString(),
        subject,
        body,
        isRead,
        sentAt: new Date(Date.now()).toLocaleDateString(),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'


    }
}


function getDefaultFilter() {
    return { from: 'user@appsus.com' }
}



function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('Miss you!', 'Would love to catch up sometimes', true),
            _createMail('Love you!', 'I love you so mach'),
            _createMail('you!', 'Would love to catch up sometimes', true),
            _createMail('Hi!', 'Would love to catch up sometimes'),
            _createMail('You Want?', 'You want ice cream?'),
            _createMail('Love you!', 'Would love to catch up sometimes'),
            _createMail('Miss you!', 'I miss you', true),
            _createMail('Miss you!', 'Would love to catch up sometimes', true),
            _createMail('Miss you!', 'Would love to catch up sometimes', true),
            _createMail('Love you!', 'I love you so mach'),
            _createMail('you!', 'Would love to catch up sometimes', true),
            _createMail('Hi!', 'Would love to catch up sometimes'),
            _createMail('You Want?', 'You want ice cream?'),
            _createMail('Love you!', 'Would love to catch up sometimes'),
            _createMail('Miss you!', 'I miss you', true),
            _createMail('Miss you!', 'Would love to catch up sometimes', true),
            _createMail('Miss you!', 'Would love to catch up sometimes', true),
            _createMail('Love you!', 'I love you so mach'),
            _createMail('you!', 'Would love to catch up sometimes', true),
            _createMail('Hi!', 'Would love to catch up sometimes'),
            _createMail('You Want?', 'You want ice cream?'),
            _createMail('Love you!', 'Would love to catch up sometimes'),
            _createMail('Miss you!', 'I miss you', true),
            _createMail('Hi!', 'Would love to catch up sometimes'),
            _createMail('You Want?', 'You want ice cream?'),
            _createMail('Love you!', 'Would love to catch up sometimes'),
            _createMail('Miss you!', 'I miss you', true),
            _createMail('Miss you!', 'Would love to catch up sometimes', true),
            _createMail('Miss you!', 'Would love to catch up sometimes', true),
            _createMail('Love you!', 'I love you so mach'),
            _createMail('you!', 'Would love to catch up sometimes', true),
            _createMail('Hi!', 'Would love to catch up sometimes'),
            _createMail('You Want?', 'You want ice cream?'),
            _createMail('Love you!', 'Would love to catch up sometimes'),
            _createMail('Miss you!', 'I miss you', true),


        ]
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, isRead) {
    const mail = getEmptyMail(subject, body, isRead)
    mail.id = utilService.makeId()
    return mail
}


function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const minSpeed = searchParams.get('minSpeed') || ''
    return {
        txt,
        minSpeed
    }
}