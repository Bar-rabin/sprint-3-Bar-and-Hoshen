const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        if (type === 'number') value = +value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    const { from } = filterByToEdit

    return (
        <section className='mail-header'>
            <div className='main-logo'>
                ☰
                <img className='logo' src='/icons/asset 1.png' />
            </div>
            <h4 className='icon-header' onClick={handleChange} >
                <img src='/icons/asset 18.png' />Inbox</h4>
            <h4 className='icon-header' >
                <img src='/icons/asset 19.png' />Starred</h4>
            <h4 className='icon-header' >
                <img src='/icons/asset 21.png' />Sent</h4>
            <h4 className='icon-header' >
                <img src='/icons/asset 22.png' />Draft</h4>
            <h4 className='icon-header' >
                <img src='/icons/asset 30.png' />Trash</h4>


        </section>
    )

}