import {OptionBox, SelectBox, Textarea} from "../styles/formStyles";

export const CONJUGATIONS = [
    "gerundo", "participio presente", "participio passato",
    "indicativo presente", "indicativo imperfetto", "indicativo passato remoto", "indicativo futuro",
    "perfetto", "congiuntivo_presente", "congiuntivo_imperfetto", "condizionale", "imperativo"

]

function ConjugationOptions({handleChangeVerbTense, isVerb, handleNoteChange, index, note}) {
    return (
        <>
            {isVerb ?
                <SelectBox
                    // id={formData.word_type}
                    name="notes"
                    value={note.split(",")[0]}
                    onChange={(e) => handleChangeVerbTense(e, index)}
                    style={{
                        width: "100%",
                        color: "#ddd",
                        background: "#222",
                        borderRadius: "8px",
                        // border: wordTypeEmpty ? "2px solid #e74c3c" : "2px solid #a9a9a9"
                    }}

                >
                    {CONJUGATIONS?.map((conjugation, index) =>
                        <OptionBox
                            key={index}
                            value={conjugation}
                        >
                            {conjugation}
                        </OptionBox>
                    )}

                </SelectBox>
                :
                <Textarea
                    className="form-input"
                    type='text'
                    name='notes'
                    value={note}
                    onChange={(e) => handleNoteChange(e, index)}
                    style={{border: "2px solid #a9a9a9"}}

                />
            }
        </>
    )

}
export default ConjugationOptions