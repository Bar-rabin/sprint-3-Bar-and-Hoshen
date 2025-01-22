const { Link } = ReactRouterDOM
import { MailPreview } from "./MailPreview.jsx";



export function MailList({ mails, onRemoveMail }) {

    return (
        <ul className='mail-list clean-list'>
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} />

                    {/* <button onClick={() => onRemoveMail(mail.id)}>{<img src='/icons/asset 30.png' />}</button> */}

                </li>)}

        </ul>
    )
}
