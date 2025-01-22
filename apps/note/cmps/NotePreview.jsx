import { LongTxt } from "./LongTxt.jsx"

export function NotePreview({ note }) {

const {info} = note
    return (
        <article className="Note-preview">
       <LongTxt txt={info.txt} />
        </article>
    )
}