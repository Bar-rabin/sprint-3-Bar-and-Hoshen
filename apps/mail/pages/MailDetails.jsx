
const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"


export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setMail)

            .catch(err => {
                console.log('Problem getting mail', err)

            })

    }


    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>
    return (
        <section className='mail-details text-align-center'>
            <h1>{mail.subject}</h1>
            <h3>{mail.body}</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga culpa laboriosam repellat at repudiandae unde a possimus delectus amet mollitia. Sunt, amet hic? Iste ullam modi obcaecati non eum provident!</p>
            <button onClick={onBack}>Back</button>

        </section>
    )
}