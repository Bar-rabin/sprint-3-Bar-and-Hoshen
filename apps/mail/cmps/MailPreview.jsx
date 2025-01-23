const { useNavigate, useParams } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {

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

    console.log(mail.createdAt)
    return (
        <article className={'mail-preview flex align-center ' + getMailClass()}>
            <div className='mail align-center' onClick={onOpenMail}>
                <p>{mail.from}</p>
                <h2>{mail.subject}</h2>
                <p>{mail.body}</p>
            </div>
            <div onClick={() => onRemoveMail(mail.id)}>{<img className='icon' src='/icons/asset 30.png' />}</div>
            <p>{mail.createdAt}</p>

        </article>
    )
}