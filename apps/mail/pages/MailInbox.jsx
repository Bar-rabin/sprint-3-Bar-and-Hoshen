

export function MailInbox({ mails, onRemoveMail }) {
    const unreadMails = mails.filter(mail => mail.isRead === false)

    return (
        <ul className='mail-list'>
            {unreadMails.map(mail => (
                <li key={mail.id}>
                    <h1>{mail.body}</h1>
                </li>
            ))}



        </ul>
    )



}