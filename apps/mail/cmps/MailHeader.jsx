const { useState, useEffect } = React

export function MailHeader({ onToggleModal }) {
    const [filterBy, setFilterBy] = useState(false)

    useEffect(() => {

    }, [filterBy])

    function handleChange({ target }) {


    }


    return (
        <section className='mail-header'>
            <div className='main-logo'>
                <img className='hamburger' src='/icons/hamburger.png' />
                <img className='logo' src='/icons/asset 1.png' />
            </div>
            <button className='compose-btn' onClick={onToggleModal}>
                <img className='icon-compose' src='/icons/asset 17.png' /> Compose</button>
            <h4 className='icon-header'  >
                <img src='/icons/asset 18.png' />Inbox</h4>
            <h4 className='icon-header' >
                <img src='/icons/asset 19.png' />Starred</h4>
            <h4 className='icon-header' onClick={handleChange} >
                <img src='/icons/asset 21.png' />Sent</h4>
            <h4 className='icon-header' >
                <img src='/icons/asset 22.png' />Draft</h4>
            <h4 className='icon-header' >
                <img src='/icons/asset 30.png' />Trash</h4>


        </section>
    )
}