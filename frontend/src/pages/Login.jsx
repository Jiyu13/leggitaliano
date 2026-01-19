import {useContext, useState} from "react";
import api from "../api";
import {
    Form, FieldBox, FormInput, FormLabel, FormPageContainer, FormWrapper,
    FormTitle, FormContainer, PasswordWrapper, FormButtonWrapper, LoginLink, FormErrorContainer, LinkText,
} from "../styles/formStyles";
import {useNavigate} from "react-router-dom";
import {SubmitInputButton} from "../styles/buttonStyles";
import {VisibilityIcon} from "../components/VisibilityIcon";
import {UserContext} from "../user-content/UserContent";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants";



function Login() {

    const {
        isLogin, setIsLogin,
        currentUser, setCurrentUser} = useContext(UserContext)

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const inputType = visible ?  "text" : "password"

    const initialValue = {email: "", password: "",}

    const [loginError, setLoginError] = useState(null)
    const [formData, setFormData] = useState(initialValue)


    function handleInputChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    function handleLoginSubmit(e) {
        e.preventDefault()
        setLoading(true);
        setLoginError(null);

        const loginUser = {
            email: formData.email,
            password: formData.password
        }

        async function postLogin() {
            try {
                const res = await api.post(`/login/`, loginUser)
                const {access, refresh, user} = res.data

                // save tokens for interceptors
                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFRESH_TOKEN, refresh);
                setIsLogin(true)
                setCurrentUser(user)
                setLoginError(null)
                window.location.replace('/');
            } catch (error) {
                console.log(error.response.data)
                const data = error.response?.data || {};
                const msg =
                    data.email?.[0] ||   // our own validation
                    data.detail ||       // DRF default error
                    data.message ||      // any custom message
                    "Login failed. Please try again."
                setIsLogin(false)
                setLoginError(msg);
            } finally {
                setLoading(false)
            }
        }

        postLogin()
    }

    function ToggleIcon() {
        setVisible(!visible)
    }

    const disabledButton =  !formData.email || !formData.password

   return (
        <FormPageContainer className="form-page-container">
            <FormContainer className='form-container'>
                <FormTitle>
                    <h1 style={{fontSize: "1.8rem", }}>Welcome back</h1>
                    <p>Sign in to your account</p>
                </FormTitle>


                <FormWrapper className="form-wrapper">
                    <Form onSubmit={handleLoginSubmit} className="form">

                        <FieldBox className="field-box">
                            <FormLabel>Email</FormLabel>
                            <FormInput
                                className="form-input"
                                type='text'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
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

                            {loginError && (
                                <FormErrorContainer style={{marginTop: "1rem"}}>
                                    <li>{loginError}</li>
                                 </FormErrorContainer>
                            )}

                        </FieldBox>

                        <FormButtonWrapper>
                            <SubmitInputButton
                                type="submit"
                                value="Sign in"
                                disabled={disabledButton}
                                style={{
                                    backgroundColor: disabledButton ? "rgba(23,188,90, 0.8)" : "rgba(23,188,90, 1)",
                                    cursor: disabledButton ? "no-drop" : "pointer",
                                }}
                            />
                        </FormButtonWrapper>
                    </Form>

                    <LinkText>
                        Don't have an account?
                        <LoginLink href="/register">
                            Sign Up
                        </LoginLink>
                        Now!
                    </LinkText>

                </FormWrapper>
            </FormContainer>

        </FormPageContainer>
    )
}


export default Login