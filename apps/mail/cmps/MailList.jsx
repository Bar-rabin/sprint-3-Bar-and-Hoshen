const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";



export function MailList({ mails, onRemoveMail, onToggelStar, starColor }) {

    return (
        <ul className='mail-list clean-list'>
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} onToggelStar={onToggelStar} starColor={starColor} />
                </li>
            )}

        </ul>
    )
}
