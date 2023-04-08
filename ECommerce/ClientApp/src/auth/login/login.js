import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { authActions } from "../../store/auth-slice";
import { loginUser, setUser } from "../../store/auth-actions";
import { statusActions } from "../../store/status-slice";
import { useEffect } from "react";


export default function Login() {

    const dispatch = useDispatch();
    const history = useHistory()

    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
             history.push('/')
        }
    }, [history, isAuthenticated])

    const validationMessages = {
        InvalidEmailAddress: 'Invalid Email Address',
        ValidEmailAddress: 'Valid Email Address'
    }

    const [formData, setFormData] = useState({
        email: '', password: '',rememberMe:false
    })

    const [formValid, setFormValid] = useState(false)

    const [emailValidData, setEmailValidData] = useState({
        className: '',
        validationMessage: ''
    })

    function isEmailValid() {
        let emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailValidator.test(formData.email)
    }

    function inputChangeHandler(event) {
        setFormData(prev => {
            prev[event.target.name] = event.target.value
            return prev;
        })

        setFormValid(prev => {
            return isEmailValid()
                && formData.password
        }
        )
    }

    function emailChangeHandler() {
        if (!isEmailValid()) {
            setEmailValidData({
                className: 'text-danger',
                validationMessage: validationMessages.InvalidEmailAddress
            })
        }
        else {
            setEmailValidData({
                className: 'text-success',
                validationMessage: validationMessages.ValidEmailAddress
            })
        }
    }


    function blurEvent() {
        if (isEmailValid()) {
            setEmailValidData({
                className: '',
                validationMessage: ''
            })
        }
    }

    function rememberMeChangeHandler() {
        setFormData(prev =>{
            prev.rememberMe = !prev.rememberMe;
            return prev;
        })
    }

    async function onFormSubmit(event) {
        event.preventDefault()
        dispatch(loginUser(formData))
    }



    return (
        <>
            <h4 style={{ paddingLeft:'6em' }}>
                Login Here
            </h4>
            <form onSubmit={onFormSubmit}>
                <div className="container">
                    <div className="row rowpad5px align-items-center m-2">
                        <div className="col-3 label text-end">
                            Email
                        </div>
                        <div className="col-3">
                            <input type="text"
                                className="form-control"
                                name="email"
                                onBlur={blurEvent}
                                onKeyUp={emailChangeHandler}
                                onChange={inputChangeHandler}
                                required />
                            <span className={emailValidData.className}
                                data-valmsg-for="email"
                                data-valmsg-replace="true">{emailValidData.validationMessage}</span>
                        </div>
                    </div>
                    <div className="row rowpad5px align-items-center m-2">
                        <div className="col-3 label text-end">
                            Password
                        </div>
                        <div className="col-3">
                            <input type="password"
                                className="form-control"
                                name="password"
                                onChange={inputChangeHandler}
                                required />
                            <span className="text-danger field-validation-valid"
                                data-valmsg-for="password"
                                data-valmsg-replace="true"></span>
                        </div>
                    </div>
                    <div className="row rowpad5px align-items-center m-2">
                        <div className="col-3 label text-end">
                            Remember me
                        </div>
                        <div className="col-3 input">
                            <input type="checkbox" className="form-check-input" onChange={rememberMeChangeHandler} name="rememberMe" />
                        </div>
                    </div>
                    <div className="row rowpad5px m-2">
                        <div className="col-2"></div>
                        <div className="col-4 text-center">
                            <input type="submit"
                                className="btn btn-primary m-2"
                                value="Login"
                                disabled={!formValid ? "disabled" : ""}
                            />
                            <input type="reset" className="btn btn-secondary m-2" value="Clear" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

