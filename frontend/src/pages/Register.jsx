import {useContext, useState} from "react";
import api from "../api";
import {
    CustomLink,
    Form,
    FieldBox,
    FormInput,
    FormLabel,
    FormPageContainer,
    FormWrapper,
    FormTitle, FormContainer, PasswordWrapper, FormButtonWrapper, LoginLink, FormErrorContainer, LinkText,
} from "../styles/formStyles";
import {replace, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {SubmitInputButton} from "../styles/buttonStyles";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import {VisibilityIcon} from "../components/widgets/VisibilityIcon";
import {UserContext} from "../user-content/UserContent";



function Register() {
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [emailExistError, setEmailExistError] = useState(null)
    const [lengthError, setLengthError] = useState(null)
    const [numericError, setNumericError] = useState(null)
    const [uppercaseError, setUppercaseError] = useState(null)
    const [lowercaseError, setLowercaseError] = useState(null)

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const inputType = visible ?  "text" : "password"

    const initialValue = {
        username: "",
        email: "",
        password: "",
    }
    const [formData, setFormData] = useState(initialValue)


    function handleInputChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    async function handleSubmitCreateAccount(e) {
        e.preventDefault()
        setEmailExistError(null)
        setLengthError(null)
        setNumericError(null)
        setUppercaseError(null)
        setLowercaseError(null)

        const createAccountData = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }

        api.post('/register/', createAccountData, { withCredentials: true })
            .then(res => {
                const {access, refresh, user} = res.data

                //  Save tokens
                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFRESH_TOKEN, refresh);

                setCurrentUser(user)

                navigate('/', { replace: true })
            })
            .catch(err => {
                const error = err.response.data

                if (error["email"]) {
                    setEmailExistError(error["email"])
                }
                if (error["length"]) {
                    setLengthError(error["length"])
                }
                if (error["numeric"]) {
                    setNumericError(error["numeric"])
                }
                if (error["upper"]) {
                    setUppercaseError(error["upper"])
                }
                if (error["lower"]) {
                    setLowercaseError(error["lower"])
                }
            })
    }

    function ToggleIcon() {
        setVisible(!visible)
    }

    const disabledButton = !formData.username || !formData.email || !formData.password

   return (
        <FormPageContainer className="form-page-container">
            <FormContainer className='form-container'>
                <FormTitle>
                    <h1 style={{fontSize: "1.8rem", }}>Get started</h1>
                    <p>Create a new account</p>
                </FormTitle>

                <FormWrapper className="form-wrapper">
                    <Form onSubmit={handleSubmitCreateAccount} className="form">
                         <FieldBox className="field-box">
                            <FormLabel>Username</FormLabel>
                            <FormInput
                                className="form-input"
                                type='text'
                                name='username'
                                value={formData.username}
                                onChange={handleInputChange}
                            />

                        </FieldBox>
                        <FieldBox className="field-box">
                            <FormLabel>Email</FormLabel>
                            <FormInput
                                className="form-input"
                                type='text'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {emailExistError && (
                                 <FormErrorContainer>
                                     <li>{emailExistError}</li>
                                 </FormErrorContainer>
                             )}
                        </FieldBox>
                        <FieldBox className="field-box">
                            <FormLabel>Password</FormLabel>
                            <PasswordWrapper>
                                <VisibilityIcon ToggleIcon={ToggleIcon} visible={visible}/>
                                <FormInput
                                    className="form-input"
                                    type={inputType}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </PasswordWrapper>
                            <div style={{fontSize: "0.9rem", fontWeight: "Bold"}}>
                                *At least: 8 characters, 1 numbers, 1 upper, 1 lower
                            </div>
                            <FormErrorContainer style={{marginTop: "1rem"}}>
                                {lengthError && (
                                     <li>{lengthError}</li>
                                )}
                                {numericError && (
                                     <li>{lengthError}</li>
                                )}
                                {uppercaseError && (
                                     <li>{uppercaseError}</li>
                                )}
                                {lowercaseError && (
                                     <li>{lowercaseError}</li>
                                )}
                             </FormErrorContainer>


                        </FieldBox>

                        <FormButtonWrapper>
                            <SubmitInputButton
                                type="submit"
                                value="Create Account"
                                disabled={disabledButton}
                                style={{
                                    backgroundColor: disabledButton ? "rgba(23,188,90, 0.8)" : "rgba(23,188,90, 1)",
                                    cursor: disabledButton ? "no-drop" : "pointer",
                                }}
                            />
                        </FormButtonWrapper>
                    </Form>

                    <LinkText>
                        Already have an account?
                        <LoginLink href="/login">
                            Login
                        </LoginLink>
                        here!
                    </LinkText>

                </FormWrapper>
            </FormContainer>

        </FormPageContainer>
    )
}


export default Register