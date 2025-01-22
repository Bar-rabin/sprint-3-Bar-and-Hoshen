const { useState } = React

export function LongTxt({ txt, length = 50 }) {
    const [isShowLong, setIsShowLong] = useState(false)

    function onToggleIsShowLong() {
        setIsShowLong(isShowLong => !isShowLong)
    }

    const isLongText = txt > length
    const textToShow = (isShowLong || !isLongText) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
                <p className="txt">{textToShow}</p>
                
        </section>
    );
}