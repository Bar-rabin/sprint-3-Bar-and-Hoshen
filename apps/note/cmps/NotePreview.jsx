import { LongTxt } from "./LongTxt.jsx"
const { useNavigate, useParams } = ReactRouterDOM
export function NotePreview({ note }) {
    const navigate = useNavigate()

console.log(note.info)
    const { info, type } = note
    return (
        <article className="Note-preview"  >
            {type === 'video' && <iframe height="100%" width="100%" src={info.url}></iframe>}
            {type === 'text' && <LongTxt txt={info.txt} />}
            {type === 'image' &&  <img src={info.src}></img>}
            
        </article>
    )
}