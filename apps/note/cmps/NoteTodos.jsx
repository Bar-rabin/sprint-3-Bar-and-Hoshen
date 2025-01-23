


export function NoteTodos() {

    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote}>
              <input type="checkbox" id="cb1" />
              <input type="text" id="cb1"/>
              <input type="checkbox" id="cb2" />
              <input type="text" id="cb1"/>
                <button>Save</button>
            </form>
        </section>
    )
}
