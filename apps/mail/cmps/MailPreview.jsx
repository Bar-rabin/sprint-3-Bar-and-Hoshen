const { useNavigate, useParams } = ReactRouterDOM

export function MailPreview({ mail }) {

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
        <article onClick={onOpenMail} className={'mail-preview flex ' + getMailClass()}>
            <h2>Subject: {mail.subject}</h2>
            <h4>{mail.body}</h4>
        </article>
    )
}