import { LongTxt } from "./LongTxt.jsx"
const { useNavigate, useParams } = ReactRouterDOM
export function NotePreview({ note }) {
    const navigate = useNavigate()


    const { info, type } = note
    return (
        <article className="Note-preview"  >
            {type === 'video'
                ? <iframe height="100%" width="100%" src={info.url}></iframe>
                : <LongTxt txt={info.txt} />
            }
        </article>
    )
}