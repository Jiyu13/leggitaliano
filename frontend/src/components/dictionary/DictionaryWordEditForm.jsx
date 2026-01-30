import {
    FieldBox,
    FormButtonWrapper,
    FormErrorContainer,
    FormLabel,
    OptionBox,
    SelectBox,
    Textarea
} from "../../styles/formStyles";
import {useContext, useState} from "react";
import {UserContext} from "../../user-content/UserContent";
import {SubmitInputButton} from "../../styles/buttonStyles";
import styled from "styled-components";
import api from "../../api";
import add_another_translation_icon from "../../assets/icons/add_24dp.svg";
import remove_this_translation_icon from "../../assets/icons/remove_24dp.svg";
import ConjugationOptions, {CONJUGATIONS} from "../ConjugationOptions";

export const IS_INHERIT = [{is_inherit: "True"}, {is_inherit: "False"}]

function DictionaryWordEditForm({word, dictionaryWords, setDictionaryWords, setShowEditFormId, setShowMeaningId,
    scrollToElement, searchResult, setSearchResult, searchInputData
}) {
    // console.log(word.notes[0].split(", ")[0])
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
    const [editFormError, setEditFormError] = useState(null)

    function handleSubmitEditForm(e) {
        e.preventDefault()
        // console.log(formData)
        api.patch(`/word/id/${word.id}/`, formData)
               .then(res => {
                   const result = res.data
                   // check if it's search input result, or clicked word result
                   if (searchResult) {
                       const updateSearchResult= searchResult.data?.map(dw => dw.id === word.id ? result : dw)
                       setSearchResult({...searchResult, data: updateSearchResult})
                   } else {
                     const updatedWords = dictionaryWords?.map(dw => dw.id === word.id ? result : dw)
                       setDictionaryWords(updatedWords)
                   }
                   setShowEditFormId(null)
                   setShowMeaningId(word.id)
                   scrollToElement()
                })
                .catch(error => {
                   if (error.response) {
                       setEditFormError(error.response.data.error)
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
        setEditFormError(null)
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

        if (value !== "") {
            setFormData(prev => {
                const next = [...prev.notes];
                next[index] = value;
                return { ...prev, notes: next };
            });
        }

    }

    function handleChangeVerbTense(e, index) {
        const newTense = e.target.value
        setFormData(prev => {
            const notesCopy = [...prev.notes]
            notesCopy[index] = newTense
            return {
                ...prev,
                notes: notesCopy,
            };
        })
    }

    function handleAddNoteClick() {
        const newNote = word.is_verb ? CONJUGATIONS[0] : ""
        setFormData({...formData, notes: [...formData.notes, newNote]})
    }

    function handleRemoveNoteClick(index) {
        const updated = formData.notes.filter((note, idx) => idx !== index)
        setFormData({...formData, notes: updated})

    }

    const inputBorder =  editFormError === "parent_word_error"  ? "1.5px solid rgba(231, 76, 60, 1)" : "1.5px solid rgba(169, 169, 169, 1)"

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
                            style={{color: "#ddd", background: "#222", borderRadius: "8px", border:  inputBorder}}

                        >
                            {wordTypes?.map((type, index) =>
                                <OptionBox key={index} value={type.type}>
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
                            style={{border: inputBorder}}

                        />
                    </FieldBox>

                    {editFormError === "parent_word_error" && (
                        <FormErrorContainer style={{margin: "0rem"}}>
                            <li>
                                Parent word &nbsp;
                                <span style={{fontWeight: "Bolder", textDecoration: "underline"}}>{formData.parent}</span>
                                &nbsp;with word type &nbsp;
                                <span style={{fontWeight: "Bolder", textDecoration: "underline"}}>{formData.word_type}</span>
                                &nbsp; not found.
                            </li>
                         </FormErrorContainer>
                    )}

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
                                    <OptionBox key={index} value={each.is_inherit}>
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
                                    <div style={{display: "flex", alignItems: "center"}} key={index}>
                                        <Textarea
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
                                name="is_inherit_notes"
                                value={formData.is_inherit_notes === false ? "False" : "True"}
                                onChange={handleInputChange}
                                style={{color: "#ddd", background: "#222", borderRadius: "8px", border: "2px solid #a9a9a9"}}
                            >
                                {IS_INHERIT?.map((each, index) =>
                                    <OptionBox key={index} value={each.is_inherit}>
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
                                    <div style={{display: "flex", alignItems: "center"}} key={index}>
                                        <ConjugationOptions
                                            handleChangeVerbTense={handleChangeVerbTense}
                                            handleNoteChange={handleNoteChange}
                                            isVerb={word.is_verb}
                                            index={index}
                                            note={note}
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
                                        <ConjugationOptions
                                            handleChangeVerbTense={handleChangeVerbTense}
                                            handleNoteChange={handleNoteChange}
                                            isVerb={word.is_verb}
                                            index={0}
                                            note=""
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
                            style={{border: "2px solid #a9a9a9", marginTop: "1rem"}}
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