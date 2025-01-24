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
            _createMail('Your order has been shipped!', 'Hello, your recent order #12345 has been shipped and is on its way!', true),
            _createMail('New discounts for you!', 'We have new discounts available on various products! Check them out on our site.'),
            _createMail('Password Reset Request', 'We received a request to reset your password. Click here to reset your password.', true),
            _createMail('January Newsletter', 'Hello, welcome to our January newsletter! Here are the top stories of the month...',),
            _createMail('Special Offer: 50% off your next purchase!', 'Hey there! Don\'t miss out on our limited-time offer. Use the code "SALE50" at checkout.'),
            _createMail('Your Weekly Digest', 'This week\'s digest is ready! Here are the latest articles and updates from our blog.'),
            _createMail('Your Travel Itinerary', 'Thank you for booking with us. Your travel itinerary for your upcoming trip is attached.', true),
            _createMail('Your order has been shipped!', 'Hello, your recent order #12345 has been shipped and is on its way!', true),
            _createMail('New discounts for you!', 'We have new discounts available on various products! Check them out on our site.', true),
            _createMail('Password Reset Request', 'We received a request to reset your password. Click here to reset your password.'),
            _createMail('January Newsletter', 'Hello, welcome to our January newsletter! Here are the top stories of the month...', true),
            _createMail('Special Offer: 50% off your next purchase!', 'Hey there! Don\'t miss out on our limited-time offer. Use the code "SALE50" at checkout.'),
            _createMail('Your Weekly Digest', 'This week\'s digest is ready! Here are the latest articles and updates from our blog.'),
            _createMail('Miss you!', 'Would love to catch up sometimes', true),
            _createMail('Exciting news!', 'We\'ve just launched our new product! Check it out!', false),
            _createMail('Hello there!', 'Long time no see! How have you been?', true),
            _createMail('Reminder', 'Don\'t forget about the meeting tomorrow at 3 PM.', false),
            _createMail('Happy Birthday!', 'Wishing you a fantastic day filled with joy!', true),
            _createMail('Important update', 'We have updated our terms and conditions. Please review them.', false),
            _createMail('Congrats!', 'You\'ve won a $50 gift card! Claim it now.', true),
            _createMail('New feature alert', 'We\'ve added a new feature to the app. Check it out now!', false),
            _createMail('Hello from support', 'Your issue has been resolved. Let us know if you need further assistance.', true),
            _createMail('Invitation', 'You are invited to our exclusive event next week. Don\'t miss it!', false),
            _createMail('Thank you!', 'Thanks for your recent purchase. We hope you love it!', true),
            _createMail('Follow up', 'Just following up on our previous conversation. Let me know your thoughts.', false),
            _createMail('Workshop reminder', 'Reminder: The workshop is tomorrow at 10 AM. See you there!', true),
            _createMail('Urgent: Action required', 'We need your approval on the latest project update. Please review.', false),
            _createMail('Good morning', 'Wishing you a productive day ahead!', true),
            _createMail('Offer extended!', 'Our special offer has been extended. Don\'t miss your chance to save!', false),
            _createMail('Feedback request', 'We would love your feedback on our recent service. Please fill out the survey.', true),
            _createMail('Your subscription ends soon', 'Just a heads up, your subscription will end in 3 days.', false),
            _createMail('Summer sale', 'Get up to 60% off on selected items. Shop now before it\'s too late!', true),
            _createMail('Thank you for your patience', 'We appreciate your patience during the downtime. Everything is back online now.', false),
            _createMail('Your order is confirmed', 'Your order #98765 has been confirmed. We will notify you once it ships.', true)



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