function UserDictVerbConjugation({wordItem}) {

    const notes = wordItem["notes"]
    const isVerb = wordItem.is_verb

    return (
        <>
            {isVerb ?
                <>
                    {notes.map((note, index) => {
                        const splitNote = note.split(',')
                        const conjugationType = splitNote[0]
                        const conjugations = splitNote.slice(1).join(",")
                        return (
                            <div key={index} style={{fontSize: "1rem"}}>
                                <div style={{fontWeight: "bolder", textDecoration: "underline"}}>
                                    {conjugationType}:
                                </div>
                                <div key={index}>{conjugations}</div>
                            </div>
                        )
                    })}
                </>
                :
                <ul>
                    {notes.map((note, index) => {
                        return (
                            <li key={index} style={{fontSize: "1rem"}}>
                                <div key={index}>{note}</div>
                            </li>
                        )
                    })}
                </ul>

            }

        </>

    )
}

export default UserDictVerbConjugation