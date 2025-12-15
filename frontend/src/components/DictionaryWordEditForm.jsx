import {FieldBox, FormButtonWrapper, FormLabel, OptionBox, SelectBox, Textarea} from "../styles/formStyles";
import {useContext, useState} from "react";
import {UserContext} from "../user-content/UserContent";
import {SubmitInputButton} from "../styles/buttonStyles";
import styled from "styled-components";
import api from "../api";
import add_another_translation_icon from "../assets/icons/add_24dp.svg";
import remove_this_translation_icon from "../assets/icons/remove_24dp.svg";

export const IS_INHERIT = [{is_inherit: "True"}, {is_inherit: "False"}]

function DictionaryWordEditForm({word, dictionaryWords, setDictionaryWords, setShowEditFormId, setShowMeaningId}) {
    // console.log(word)
    const {wordTypes, } = useContext(UserContext)

    const initialValue = {
        id: word.id,
        word: word.word,
        translations: word.translations,
        is_inherit_translations: word.is_inherit_translations,
        ipa: word.ipa,
        parent: word.parent || "",
        notes: word.notes,
        is_inherit_notes: word.is_inherit_notes,
        word_type: word.word_type   // pass "string" type name to post request
    }

    const [formData, setFormData] = useState(initialValue)

    function handleSubmitEditForm(e) {
        e.preventDefault()
        // const translations_payload = formData.is_inherit_translations ? [] : formData.translations
        // const notes_payload =
        //     (!formData.parent && !formData.is_inherit_notes && formData.notes === [])
        //     || (formData.parent && formData.is_inherit_notes)
        //     ? [] : formData.notes.map((note, index) =>  note.trim()).filter(note => note !== "");
        // const payload = {...formData, "translations": translations_payload}
        // console.log(formData)
        api.patch(`/word/id/${word.id}/`, formData)
               .then(res => {
                   const result = res.data
                   const updatedWords = dictionaryWords?.map(dw => dw.id === word.id ? result : dw)
                   setDictionaryWords(updatedWords)
                   setShowMeaningId(word.id)
                   setShowEditFormId(null)
                })
                .catch(error => {
                   if (error.response) {
                   console.log(error.response.data.error);
                  } else {
                    console.log("network error", error.message);
                }})

    }

    function handleInputChange(e){
        // formData.notes is a string , converted to list in the backend
        const name = e.target.name
        let value
        if (name === "is_inherit_translations" || name === "is_inherit_notes") {
            value = e.target.value === "True"
        } else {
            value = e.target.value
        }
        setFormData({...formData, [name]:value})
    }

    function handleTranslationChange(e, index) {
        const value = e.target.value
        setFormData(prev => {
            const next = [...prev.translations];
            next[index] = value;
            return { ...prev, translations: next };
        });
    }

    function handleAddTranslationButtonClick() {
        setFormData({...formData, translations: [...formData.translations, ""]})
    }

    function handleRemoveTranslationButtonClick(index) {
        const updated = formData.translations.filter((tran, idx) => idx !== index)
        setFormData({...formData, translations: updated})
    }

    function handleNoteChange(e, index) {
        const value = e.target.value
        setFormData(prev => {
            const next = [...prev.notes];
            next[index] = value;
            return { ...prev, notes: next };
        });
    }

    function handleAddNoteClick() {
        setFormData({...formData, notes: [...formData.notes, ""]})
    }

    function handleRemoveNoteClick(index) {
        const updated = formData.notes.filter((note, idx) => idx !== index)
        setFormData({...formData, notes: updated})

    }

    return (
        <NewWordContainer className="edit-word-container">
            <NewWordContainerWrapper>

            </NewWordContainerWrapper>
            <NewWordFormTitle>
                Edit Meaning
            </NewWordFormTitle>
            <NewWordFormWrapper className="edit-word-form-wrapper">
                <NewWordForm onSubmit={handleSubmitEditForm} className="form">

                    <FieldBox className="field-box">
                        <FormLabel style={{color: "#ddd"}}>Word</FormLabel>
                        <Textarea
                            className="form-input"
                            type="text"
                            name='word'
                            defaultValue={formData.word}
                            disabled={true}
                            style={{border: "2px solid #a9a9a9"}}

                        />
                    </FieldBox>


                    <FieldBox className="field-box" style={{padding: "1rem 0 0"}}>
                        <FormLabel style={{color: "#ddd"}}>Word Type</FormLabel>
                        <SelectBox
                            id={formData.word_type}
                            name="word_type"
                            value={formData.word_type}
                            onChange={handleInputChange}
                            style={{
                                color: "#ddd",
                                background: "#222",
                                borderRadius: "8px",
                                // border: wordTypeEmpty ? "2px solid #e74c3c" : "2px solid #a9a9a9"
                            }}

                        >
                            {wordTypes?.map((type, index) =>
                                <OptionBox
                                    key={index}
                                    value={type.type}
                                >
                                    {type.type}
                                </OptionBox>
                            )}

                        </SelectBox>
                    </FieldBox>

                    <FieldBox className="field-box" style={{margin: "1rem 0 0"}}>
                        <FormLabel style={{color: "#ddd"}}>Ipa</FormLabel>
                        <Textarea
                            className="form-input"
                            type="text"
                            name='ipa'
                            value={formData.ipa}
                            onChange={handleInputChange}
                            style={{border: "2px solid #a9a9a9"}}

                        />
                    </FieldBox>
                    <FieldBox className="field-box" style={{padding: "1rem 0 0"}}>
                        <FormLabel style={{color: "#ddd"}}>Parent</FormLabel>
                        <Textarea
                            className="form-input"
                            type="text"
                            name='parent'
                            value={formData.parent}
                            onChange={handleInputChange}
                            style={{border: "2px solid #a9a9a9"}}

                        />
                    </FieldBox>

                    {formData.parent && (
                        <FieldBox className="field-box" style={{padding: "1rem 0 0"}}>
                            <FormLabel style={{color: "#ddd"}}>Is inherit translations?</FormLabel>
                            <SelectBox
                                // id={formData.is_inherit_translations}
                                name="is_inherit_translations"
                                value={formData.is_inherit_translations === false ? "False" : "True"}
                                onChange={handleInputChange}
                                style={{color: "#ddd", background: "#222", borderRadius: "8px", border: "2px solid #a9a9a9"}}
                            >
                                {IS_INHERIT?.map((each, index) =>
                                    <OptionBox
                                        key={index}
                                        value={each.is_inherit}
                                    >
                                        {each.is_inherit}
                                    </OptionBox>
                                )}

                            </SelectBox>
                        </FieldBox>
                    )}

                    {formData.is_inherit_translations === false  && (
                        <FieldBox className="field-box" style={{padding: "1rem 0 0"}}>
                            <FormLabel style={{color: "#ddd"}}>Translations</FormLabel>
                            {formData.translations.length !== 0 ? (

                                formData.translations.map((t, index) =>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Textarea
                                            key={index}
                                            className="form-input"
                                            type='text'
                                            name='translations'
                                            value={t}
                                            onChange={(e) => handleTranslationChange(e, index)}
                                            style={{border: "2px solid #a9a9a9"}}

                                        />

                                        {index === formData?.translations.length - 1 ?

                                            <AddTranslationIconImg
                                                alt="add another translation icon"
                                                src={add_another_translation_icon}
                                                onClick={handleAddTranslationButtonClick}
                                            />
                                            :
                                            <AddTranslationIconImg
                                                alt="remove this translation icon"
                                                src={remove_this_translation_icon}
                                                onClick={() => handleRemoveTranslationButtonClick(index)}
                                            />
                                        }
                                    </div>
                                ))
                                :
                                (
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Textarea
                                            className="form-input"
                                            type='text'
                                            name='translations'
                                            value=""
                                            onChange={(e) => handleTranslationChange(e, 0)}
                                            style={{border: "2px solid #a9a9a9"}}

                                        />

                                        <AddTranslationIconImg
                                            alt="add another translation icon"
                                            src={add_another_translation_icon}
                                            onClick={handleAddTranslationButtonClick}
                                        />
                                    </div>
                                )
                            }
                        </FieldBox>
                    )}

                    {formData.parent && (
                        <FieldBox className="field-box" style={{padding: "1rem 0 0"}}>
                            <FormLabel style={{color: "#ddd"}}>Is inherit notes?</FormLabel>
                            <SelectBox
                                // id={formData.is_inherit_notes}
                                name="is_inherit_notes"
                                value={formData.is_inherit_notes === false ? "False" : "True"}
                                onChange={handleInputChange}
                                style={{color: "#ddd", background: "#222", borderRadius: "8px", border: "2px solid #a9a9a9"}}
                            >
                                {IS_INHERIT?.map((each, index) =>
                                    <OptionBox
                                        key={index}
                                        value={each.is_inherit}
                                    >
                                        {each.is_inherit}
                                    </OptionBox>
                                )}

                            </SelectBox>
                        </FieldBox>
                    )}

                    {formData.is_inherit_notes === false && (
                        <FieldBox className="field-box" style={{padding: "1rem 0 0"}}>
                            <FormLabel style={{color: "#ddd"}}>Notes</FormLabel>
                            {formData.notes.length !== 0 ? (
                                formData.notes.map((note, index) =>
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Textarea
                                            key={index}
                                            className="form-input"
                                            type='text'
                                            name='notes'
                                            value={note}
                                            onChange={(e) => handleNoteChange(e, index)}
                                            style={{border: "2px solid #a9a9a9"}}

                                        />
                                        {index === formData?.notes.length - 1 ?

                                            <AddTranslationIconImg
                                                alt="add another note icon"
                                                src={add_another_translation_icon}
                                                onClick={handleAddNoteClick}
                                            />
                                            :
                                            <AddTranslationIconImg
                                                alt="remove this note icon"
                                                src={remove_this_translation_icon}
                                                onClick={() => handleRemoveNoteClick(index)}
                                            />
                                        }


                                    </div>
                                ))
                                :
                                (
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Textarea
                                            className="form-input"
                                            type='text'
                                            name='notes'
                                            value=""
                                            onChange={(e) => handleNoteChange(e, 0)}
                                            style={{border: "2px solid #a9a9a9"}}

                                        />

                                        <AddTranslationIconImg
                                            alt="add another note icon"
                                            src={add_another_translation_icon}
                                            onClick={handleAddNoteClick}
                                        />
                                    </div>
                                )
                            }
                        </FieldBox>
                    )}


                    <FormButtonWrapper>
                        <SubmitInputButton
                            type="submit"
                            value="Edit"
                            // disabled={disabledButton}
                            style={{
                                border: "2px solid #a9a9a9", marginTop: "1rem"
                                // backgroundColor: disabledButton ? "rgba(40,44,52,.7)" : "rgba(40,44,52, 1)",
                                // cursor: disabledButton ? "no-drop" : "pointer",
                            }}
                        />
                    </FormButtonWrapper>
                </NewWordForm>

            </NewWordFormWrapper>

        </NewWordContainer>
    )
}
export const AddTranslationIconImg = styled.img`
  margin: 8px;
  width: 28px;
  height: 28px;
  cursor: pointer;
      border-radius: 25px;


  
  //&:hover {
  //  //background-color:rgb(82, 82, 82);
  //}
  
`
export  const NewWordForm = styled.form``
export  const NewWordFormWrapper = styled.div`
  padding: 0 1rem 1rem;
  //background-color: #ffffcc;
`
export  const NewWordFormTitle = styled.div`
  text-align: center;
  color: #ddd;
  padding: 1rem 1rem 0;
  //background-color: #5b80b2;
`

export const NewWordContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const NewWordContainer = styled.div`
  background-color: #222;
  display: block;
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 2rem;
  padding-bottom: 2rem;
`

export default DictionaryWordEditForm