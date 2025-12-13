import {FieldBox, FormButtonWrapper, FormLabel, OptionBox, SelectBox, Textarea} from "../styles/formStyles";
import {useContext, useState} from "react";
import styled from "styled-components";
import {SubmitInputButton} from "../styles/buttonStyles";
import {UserContext} from "../user-content/UserContent";
import add_another_translation_icon from "../assets/icons/add_24dp.svg";
import remove_this_translation_icon from "../assets/icons/remove_24dp.svg";
import api from "../api";
import {IS_INHERIT} from "./DictionaryWordEditForm";


function DictionaryWordNewMeaningForm({
      clickedWord, setIpa, setDictionaryWords, setNotFound, setShowNewMeaningForm
}) {
    const {wordTypes} = useContext(UserContext)

    const initialValue = {
        word: clickedWord,
        translations: [""],
        ipa: "",
        parent: "",
        notes: null,
        word_type_id: null,   // pass "string" id to post request
        is_inherit_notes: false,
        is_inherit_translations: false,
    }

    const [formData, setFormData] = useState(initialValue)
    const [wordTypeEmpty, setWordTypeEmpty] = useState(false)

    function handleFormSubmit(e) {
        e.preventDefault()
        setWordTypeEmpty(false)
        if (!formData.word_type_id) {
            setWordTypeEmpty(true)
        } else {
            const translations_payload = formData.is_inherit_translations ? [] : formData.translations
            const notess_payload = formData.is_inherit_notes ? "" : formData.notes

            const payload = {...formData, "translations": translations_payload, "notes": notess_payload}
            // console.log(payload)
            api.post(`/words/`, payload)
               .then(res => {
                   const result = res.data
                   console.log("add word result-------------", result)
                   const ipa = result["ipa"]
                   const data = result["data"]
                   setIpa(ipa)
                   setDictionaryWords(prev => {
                       if (prev === null) {
                           return [data]
                       } else {
                           return [...prev, data]
                       }
                   })
                   setShowNewMeaningForm(false)
                   setNotFound(null)
                })
                .catch(error => {
                   if (error.response) {
                   console.log(error.response.data.error);
                  } else {
                    console.log("network error", error.message);
                }})
        }


    }

     function handleInputChange(e) {
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

    return (
        <NewWordContainer className="new-word-container">
            <NewWordContainerWrapper>

            </NewWordContainerWrapper>
            <NewWordFormTitle>
                New Meaning
            </NewWordFormTitle>
            <NewWordFormWrapper className="new-word-form-wrapper">
                <NewWordForm onSubmit={handleFormSubmit} className="form">

                    <FieldBox className="field-box">
                        <FormLabel style={{color: "#ddd"}}>Word</FormLabel>
                        <div
                            className="form-input"
                            style={{boxSizing: "border-box", fontSize: "1rem", padding: "8px 12px", border: "2px solid #a9a9a9", borderRadius: "8px"}}
                        >
                            {formData.word}
                        </div>
                    </FieldBox>


                    <FieldBox className="field-box" style={{padding: "1rem 0 0"}}>
                        <FormLabel style={{color: "#ddd"}}>Word Type</FormLabel>
                        <SelectBox
                            id={formData.word_type_id}
                            name="word_type_id"
                            value={formData.word_type_id || "" }
                            onChange={handleInputChange}
                            style={{
                                color: "#ddd",
                                background: "#222",
                                borderRadius: "8px",
                                border: wordTypeEmpty ? "2px solid #e74c3c" : "2px solid #a9a9a9"
                            }}

                        >
                            <OptionBox value="" disabled>Select word type</OptionBox>
                            {wordTypes?.map((type, index) =>
                                <OptionBox
                                    key={index}
                                    value={type.id}
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
                                id={formData.is_inherit_translations}
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

                    {(formData.is_inherit_translations === false ) && (
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
                                id={formData.is_inherit_notes}
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
                        <FormLabel style={{color: "#ddd"}}>Notes (e.g. note1; note2; ...)</FormLabel>
                        <Textarea
                            className="form-input"
                            type="text"
                            name='notes'
                            value={formData.notes}
                            onChange={handleInputChange}
                            style={{border: "2px solid #a9a9a9"}}

                        />
                    </FieldBox>
                    )}

                    <FormButtonWrapper>
                        <SubmitInputButton
                            type="submit"
                            value="Add"
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

export default DictionaryWordNewMeaningForm