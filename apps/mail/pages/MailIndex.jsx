const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM


import { MailHeader } from '../cmps/MailHeader.jsx'
import { utilService } from '../../../services/util.service.js'
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from './MailCompose.jsx'
import { MailInbox } from './MailInbox.jsx'

export function MailIndex() {

    const { Fragment } = React
    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    // const [filteredMails, setFilteredMails] = useState([]);



    useEffect(() => {
        setSearchParams(utilService.getTruthyValues())
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
                setFilteredMails(mails)
            })
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

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function filterMailsFromMomo() {
        const filtered = mails.filter(mail => mail.from === 'momo@momo.com')
        setFilteredMails(filtered)
    }

    function onToggleModal() {
        setIsOpen(isOpen => !isOpen)
    }

    if (!mails) return <h1>Loading...</h1>
    return (
        <Fragment>
            <section className='mail-index'>
                <MailHeader onToggleModal={onToggleModal} onSetFilter={onSetFilter} filterBy={filterBy} />


                <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail}>
                </MailList>
                {/* <MailInbox
                    mails={mails}
                    onRemoveMail={onRemoveMail}>
                </MailInbox> */}
                <MailCompose
                    isOpen={isOpen} onClose={() => setIsOpen(false)}>

                </MailCompose>
            </section>
        </Fragment>
    )
}

