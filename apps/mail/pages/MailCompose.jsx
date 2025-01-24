const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"


export function MailCompose({ isOpen = false, onClose = () => { } }) {

    const { mailId } = useParams()
    const navigate = useNavigate()
    const [mailToSend, setMailToSend] = useState(mailService.getEmptyMailToSend)



    function onSendMail(ev) {
        ev.preventDefault()

        mailService.save(mailToSend)
            .then(savedMail => {
                console.log('savedMail:', savedMail)
                onClose()
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
        setMailToSend(prevMailToSend => ({ ...prevMailToSend, [field]: value }))
    }

    let { from, to, subject, body } = mailToSend

    console.log(mailToSend)

    if (!isOpen) return null
    return (
        <section className='mail-compose'>
            <h1>New Message</h1>
            <form onSubmit={onSendMail}>
                <label htmlFor='from'>From</label>
                <input value={from} onChange={handleChange} type="text" name='from' id='from'></input>

                <label htmlFor='to'>To</label>
                <input value={to} onChange={handleChange} type="text" name='to' id="to"></input>

                <label htmlFor='subject'>Subject</label>
                <input value={subject} onChange={handleChange} type="text" name='subject' id="subject"></input>

                <label htmlFor='body'>Your Message</label>
                <input value={body} onChange={handleChange} type="text" name='body' id="body"></input>

                <button>Send</button>
                <button className='close-btn' onClick={onClose}>X</button>
            </form>
        </section>
    )

}

