export function NoteHeader() {

    return (
        <section className='notes-header flex spaced-between'>
            <div className='main-logo flex'>
                <img className="ham" src="icons/hamburger.svg" alt="" />
                <img className='logo' src='icons/logonotes.png' />
                <h3>KEEP</h3>
            </div>
            <article className="search-bar">
                <form action="search">
                    <input className="search-input" type="search" placeholder="search" />
                   

                </form>
                        <img className="search-icon" src="icons/search.svg" alt="" />
            </article>
        </section>
    )
}