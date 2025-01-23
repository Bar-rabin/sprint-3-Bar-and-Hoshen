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
        <article className={'mail-preview flex align-center ' + getMailClass()}>
            <div className='mail align-center' onClick={onOpenMail}>
                <h2>{mail.subject}</h2>
                <p>{mail.body}</p>
                {/* <p>{mail.from}</p> */}
                <div onClick={() => onRemoveMail(mail.id)}>{<img className='icon' src='/icons/asset 30.png' />}</div>
            </div>

        </article>
    )
}