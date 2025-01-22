const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM


import { utilService } from '../../../services/util.service.js'
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        setSearchParams(utilService.getTruthyValues())
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(setMails)
            .catch(err => {
                console.log('Problems getting mails:', err)
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mailId))

            })
            .catch(err => {
                console.log('Problems removing mail:', err)
            })
    }
    console.log(mails)

    if (!mails) return <h1>Loading...</h1>
    return (
        <section className='mail-index'>
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail} />
        </section>
    )
}

