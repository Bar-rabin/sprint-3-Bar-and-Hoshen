export function ColorInput({ onSetNoteStyle, backgroundColor }) {

    const colors = [
        '#F44236',
        '#9C27B0',
        '#3F51B5',
        '#2196F3',
        '#4caf50',
        '#fca650',
        'white'
    ]


    function onSetColor(color) {
        console.log(color)
        const NoteStyle = { backgroundColor: color }
        onSetNoteStyle(NoteStyle)
        console.log(NoteStyle)
    }


    return (
        <section className="color-input">
            <div className="items-container">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`item ${color === backgroundColor ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    >
                    </div>
                ))}
            </div>
         
        </section >
    )
}