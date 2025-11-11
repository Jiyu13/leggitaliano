import {FieldBox, FormButtonWrapper, FormLabel, OptionBox, SelectBox, Textarea} from "../styles/formStyles";
import {useContext, useState} from "react";
import {UserContext} from "../user-content/UserContent";
import {SubmitInputButton} from "../styles/buttonStyles";
import styled from "styled-components";
import api from "../api";

function DictionaryWordEditForm({word, dictionaryWords, setDictionaryWords, setShowEditForm}) {

    const {wordTypes, } = useContext(UserContext)

    const initialValue = {
        id: word.id,
        word: word.word,
        translations: word.translations,
        ipa: word.ipa,
        parent: word.parent || "",
        notes: word.notes,
        word_type: word.word_type   // pass "string" type to post request
    }

    const [formData, setFormData] = useState(initialValue)
    const [wordTypeEmpty, setWordTypeEmpty] = useState(false)

    function handleInputChange(e){
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]:value})
    }
    function handleSubmitEditForm(e) {
        e.preventDefault()
        setWordTypeEmpty(false)
        console.log(formData)
        api.patch(`/word/id/${word.id}/`, formData)
               .then(res => {
                   const result = res.data
                   console.log(result)
                   const updatedWords = dictionaryWords?.map(dw => dw.id === word.id ? result : dw)
                   setDictionaryWords(updatedWords)
                   setShowEditForm(false)

                })
                .catch(error => {
                   if (error.response) {
                   console.log(error.response.data.error);
                  } else {
                    console.log("network error", error.message);
                }})

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

                    <FieldBox className="field-box" style={{padding: "1rem 0 0"}}>
                        <FormLabel style={{color: "#ddd"}}>Translations</FormLabel>

                        {formData.translations.map((t, index) =>
                            <Textarea
                                key={index}
                                className="form-input"
                                type='text'
                                name='translations'
                                value={t}
                                onChange={(e) => {}}
                                style={{border: "2px solid #a9a9a9"}}

                            />

                        )}


                    </FieldBox>

                    <FieldBox className="field-box" style={{padding: "1rem 0 0"}}>
                        <FormLabel style={{color: "#ddd"}}>Notes</FormLabel>
                        <Textarea
                            className="form-input"
                            type="text"
                            name='notes'
                            value={formData.notes}
                            onChange={handleInputChange}
                            style={{border: "2px solid #a9a9a9"}}

                        />
                    </FieldBox>

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