import {useState} from "react";
import api from "../api";
import {
    CustomLink,
    Form,
    FieldBox,
    FormInput,
    FormLabel,
    FormPageContainer,
    FormWrapper,
    FormTitle, FormContainer, PasswordWrapper, FormButtonWrapper,
} from "../styles/formStyles";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {SubmitInputButton} from "../styles/buttonStyles";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";
import {VisibilityIcon} from "../components/VisibilityIcon";



function Register() {
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
        username: "jiyu",
        email: "ziru.fish@gmail.com",
        password: "19930913fish",
    }
    const [formData, setFormData] = useState(initialValue)


    function handleInputChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    async function handleSubmitCreateAccount(e) {
        e.preventDefault()
        const createAccountData = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }

        api.post('/register/', createAccountData, { withCredentials: true })
            .then(res => {
                const user = res.data.user
                // setCurrentUser(user)

                // ================================= perform the login ===============
                // const loginUser = {
                //     email: formData.email,
                //     password: formData.password
                // }
                // return api.post('/login/', loginUser, { withCredentials: true })
            })
            .then((res) => {
                // ============== login successful & create cart =================
                //setIsLogin(true)
                const user = res.data
                //setCurrentUser(user)
            })
            .then(res => {

            })
            .catch(err => {
                //setIsLogin(false)

                setEmailExistError(null)
                setLengthError(null)
                setNumericError(null)
                setUppercaseError(null)
                setLowercaseError(null)


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

                {/*<PasswordRestrictions*/}
                {/*    lengthError={lengthError}*/}
                {/*    numericError={numericError}*/}
                {/*    alphabeticError={alphabeticError}*/}
                {/*/>*/}

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
                            {/*{lastNameError && (*/}
                            {/*     <ErrorContainer>*/}
                            {/*         <span>*{lastNameError}</span>*/}
                            {/*     </ErrorContainer>*/}
                            {/* )}*/}
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
                                 <ErrorContainer>
                                     <li>{emailExistError}</li>
                                 </ErrorContainer>
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
                            <ErrorContainer style={{marginTop: "1rem"}}>
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
                             </ErrorContainer>


                        </FieldBox>

                        <FormButtonWrapper>
                            <SubmitInputButton
                                type="submit"
                                value="Create Account"
                                disabled={disabledButton}
                                style={{
                                    backgroundColor: disabledButton ? "rgba(40,44,52,.7)" : "rgba(40,44,52, 1)",
                                    cursor: disabledButton ? "no-drop" : "pointer",
                                }}
                            />
                        </FormButtonWrapper>
                    </Form>

                    <div style={{fontSize: "0.9rem"}}>
                        Already have an account?
                        <LoginLink href="/login">
                            Login
                        </LoginLink>
                        here!
                    </div>

                </FormWrapper>
            </FormContainer>

        </FormPageContainer>
    )
}


const LoginLink = styled(CustomLink)`
  color: rgb(82, 82, 82);
  font-size: 0.9rem;
  margin: 0 6px;
  font-weight: bold;
`


const ErrorContainer = styled.ul`
  color: #e74c3c;
  font-size: 0.9rem;
  padding-left: 15px;  
  margin: 0 0 1rem;
`

export default Register