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
    console.log(mails)

    if (!mails) return <h1>Loading...</h1>
    return (
        <section className='mail-index'>
            <MailList mails={mails} />
        </section>
    )
}

