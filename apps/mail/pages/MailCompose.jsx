const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"


export function MailCompose({ children, isOpen = false, onClose = () => { } }) {

    // const { mailId } = useParams()
    // const navigate = useNavigate()

    function onSendMail() {
        console.log('jj')
    }

    if (!isOpen) return null
    return (
        <section className='mail-compose'>
            <h1>New Message</h1>
            <form onSubmit={onSendMail}>
                <label htmlFor='from'>From</label>
                <input type="text" name='from' id='from' placeholder='Your-Mail'></input>

                <label htmlFor='to'>To</label>
                <input type="text" name='to' id="to"></input>

                <label htmlFor='Subject'>Subject</label>
                <input type="text" name='subject' id="subject"></input>

                <button>Send</button>
                <button className='close-btn' onClick={onClose}>X</button>
            </form>
        </section>
    )

}

