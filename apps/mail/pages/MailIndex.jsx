const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM


import { MailHeader } from '../cmps/MailHeader.jsx'
import { utilService } from '../../../services/util.service.js'
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from './MailCompose.jsx'

export function MailIndex() {

    const { Fragment } = React
    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)


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

    function onToggleModal() {
        setIsOpen(isOpen => !isOpen)
    }

    if (!mails) return <h1>Loading...</h1>
    return (
        <Fragment>
            <button onClick={onToggleModal}>Compose</button>
            <section className='mail-index'>
                <MailHeader />
                <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail}>
                </MailList>
                <MailCompose
                    isOpen={isOpen} onClose={() => setIsOpen(false)}>

                </MailCompose>
            </section>
        </Fragment>
    )
}

