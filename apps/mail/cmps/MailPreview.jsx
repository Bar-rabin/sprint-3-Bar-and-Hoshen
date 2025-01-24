import { LongTxt } from './LongText.jsx'

const { useNavigate, useParams } = ReactRouterDOM
const { useEffect, useState } = React


export function MailPreview({ mail, onRemoveMail, onToggelStar, starColor, handleMarkAsRead }) {

    const navigate = useNavigate()
    // const [currentMail, setCurrentMail] = useState(mail)



    function getMailClass() {
        return mail.isRead ? 'read' : ''
    }

    function onOpenMail(ev) {
        ev.preventDefault()

        handleMarkAsRead(mail.id)

        navigate(`/mail/${mail.id}`)

    }
    console.log('mail:', mail)
    return (
        <article className={'mail-preview flex align-center ' + getMailClass()}>
            <div className='mail align-center' onClick={onOpenMail}>
                <p>{mail.from}</p>
                <p>{mail.subject}</p>
                {/* <p>{mail.body}</p> */}
                <LongTxt txt="">
                    {mail.body}
                </LongTxt>
            </div>
            <div className='icon' onClick={() => onRemoveMail(mail.id)}>
                {<img src='/icons/asset 30.png' />}
            </div>
            <div className='icon' onClick={() => onToggelStar(mail.id)}>
                {<img src='/icons/asset 19.png' />}
            </div>

            <p>{mail.createdAt}</p>

        </article>
    )
}