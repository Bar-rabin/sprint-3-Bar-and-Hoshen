const { useNavigate, useParams } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onToggelStar, starColor }) {

    const navigate = useNavigate()

    function getMailClass() {
        if (mail.isRead) {
            return 'read'
        } else return ''

    }

    function onOpenMail(ev) {
        ev.preventDefault()
        navigate(`/mail/${mail.id}`)
    }

    return (
        <article className={'mail-preview flex align-center ' + getMailClass()}>
            <div className='mail align-center' onClick={onOpenMail}>
                <p>{mail.from}</p>
                <h2>{mail.subject}</h2>
                <p>{mail.body}</p>
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