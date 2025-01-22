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


    return (
        <article className={'mail-preview flex ' + getMailClass()}>
            <div className='mail align-center' onClick={onOpenMail}>
                <h2>{mail.subject}</h2>
                <h4>{mail.body}</h4>
            </div>
            <div onClick={() => onRemoveMail(mail.id)}>{<img className='icon' src='/icons/asset 30.png' />}</div>

        </article>
    )
}