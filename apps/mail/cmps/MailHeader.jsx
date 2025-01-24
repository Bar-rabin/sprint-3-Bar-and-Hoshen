
export function MailHeader({ onToggleModal, onSetFilter, inboxCount }) {


    return (
        <section className='mail-header'>
            <div className='main-logo'>
                <img className='hamburger' src='/icons/hamburger.png' />
                <img className='logo' src='/icons/asset 1.png' />
            </div>
            <button className='compose-btn' onClick={onToggleModal}>
                <img className='icon-compose' src='/icons/asset 17.png' /> Compose</button>
            <p className='icon-header' onClick={() => onSetFilter('user@appsus.com')} >
                <img src='/icons/asset 18.png' />{'Inbox'}</p>
            <p className='icon-header' >
                <img src='/icons/asset 19.png' />Starred</p>
            <p className='icon-header' onClick={() => onSetFilter('momo@momo.com')} >
                <img src='/icons/asset 21.png' />Sent</p>
            <p className='icon-header' >
                <img src='/icons/asset 22.png' />Draft</p>
            <p className='icon-header' >
                <img src='/icons/asset 30.png' />Trash</p>


        </section>
    )
}