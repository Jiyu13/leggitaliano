import styled from "styled-components";
import {useState} from "react";
import {FieldBox, Form, FormInput, FormLabel, FormTextarea, FormWrapper} from "../styles/formStyles";
import {FilledButton} from "../styles/buttonStyles";
import api from "../api";

function ArticleCreate() {

    const initialValues = {title: "", content: ""}
    const [formData, setFormData] = useState(initialValues)
    const [totalWords, setTotalWords ]= useState(0)

    function onValueChange(e) {
        const name = e.target.name
        const value = e.target.value
        if (name === "content") {
            // split content by one or more whitespace characters
            const split_content = value.trim().split(/\s+/)
            const clean_words = split_content.filter(word => word !== "")
            setTotalWords(clean_words.length)
        }
        console.log(name, value)
        setFormData({...formData, [name]: value})
    }

    function handleFormSubmit(e) {
        e.preventDefault()

        const newArticle = {
            title: formData.title,
            content: formData.content
        }

        async function createArticle() {
            try {
                const res = await api.post("/articles/", newArticle)
                const data = res.data
                console.log(data)
                window.location.replace('/');
            } catch (error) {
                console.log(error.response.data)
            }
        }
        createArticle()

    }

    return (
        <ArticleCreatePageContainer className="article-create-page-container">
            <ArticleCreatePageWrapper className="article-create-page-wrapper">
                <FormWrapper
                    className="form-wrapper"
                    style={{height: "100%", padding: "0"}}
                >
                    <Form
                        onSubmit={handleFormSubmit}
                        className="form"
                        style={{minHeight: '750px', height: "100%", display: "flex", flexDirection: "column", flex: 1}}
                    >
                         <SubmitButtonContainer>
                             {/*<TotalWords>Total: {totalWords} words.</TotalWords>*/}
                            <FilledButton
                                type="submit"
                                style={{width: "120px"}}
                            >
                                Add
                            </FilledButton>
                        </SubmitButtonContainer>

                        <FieldBox className="field-box">
                            <FormInput
                                type="text"
                                name="title"
                                value={formData.title}
                                placeholder="Add a title."
                                onChange={onValueChange}
                                style={{}}
                            />
                        </FieldBox>

                        <FieldBox className="field-box">
                            <FormTextarea
                                type="text"
                                name="content"
                                value={formData.content}
                                placeholder="Enter the text."
                                onChange={onValueChange}
                                style={{minHeight: "520px"}}
                            />
                        </FieldBox>
                    </Form>

               </FormWrapper>

            </ArticleCreatePageWrapper>
        </ArticleCreatePageContainer>
    )
}
const TotalWords = styled.div`
  padding: 0 1rem;
`
const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 0;
`
const ArticleCreatePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 727px;
`

const ArticleCreatePageContainer = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 30px;
  overflow-y: hidden;
`
export default ArticleCreate;